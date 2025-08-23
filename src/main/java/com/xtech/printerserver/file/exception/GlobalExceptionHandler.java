package com.xtech.printerserver.file.exception;

import com.xtech.printerserver.file.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ErrorResponse handleException(Exception e) {
        return new ErrorResponse(e.getMessage(),
                e.getCause().toString(),
                LocalDateTime.now());
    }
    @ExceptionHandler(value = AbstractExceptionHandler.class)
    public ResponseEntity<ErrorResponse> handleException(AbstractExceptionHandler e){
        return ResponseEntity.status(e.getHttpStatus()).body(new ErrorResponse(e.getMessage(),
                e.getCause().toString(),
                LocalDateTime.now()));
    }

}
