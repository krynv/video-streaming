# Video Streaming Server

Basic example of a video streaming service.


## The general gist of this
Browser -> Node JS server

Browser renders a basic HTML page with a `<video src='/video' />` element.

The video element makes a request to the server on the `/video` endpoint.

Request Headers:
```
Request Headers {
    Request-URL: http://localhost:8000/video
    Request Method: GET
    Range: bytes=0-
}
```

To get the beginning of the video we need to request the 0'th byte; hence the `0-`. 

The server, in response, sends a part of the video (not the entire thing when you load the page), returning a `206` status code (partial content).

Response headers:
```
Response Headers {
    Accept_ranges: bytes
    Content-Length: 10000001
    Content-Range: bytes 0-1000000/63614462
    Content-Type: video/mp4
}
```

The webpage will recognise that this is an incomplete video, and the video element will only play what it has 'downloaded' so far.

As the video continues to play, the next 'chunk' is requested and the cycle continues...
