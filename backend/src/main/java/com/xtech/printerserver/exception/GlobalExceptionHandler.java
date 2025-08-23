package com.xtech.printerserver.exception;

import com.xtech.printerserver.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ErrorResponse handleException(Exception e) {
        return new ErrorResponse(e.getMessage(),
                e.getCause() != null ? e.getCause().getMessage() : "Unknown error",
                LocalDateTime.now());
    }
    @ExceptionHandler(value = AbstractExceptionHandler.class)
    public ResponseEntity<ErrorResponse> handleException(AbstractExceptionHandler e){
        return ResponseEntity.status(e.getHttpStatus()).body(new ErrorResponse(e.getMessage(),
                e.getCause() != null ? e.getCause().getMessage() : "Unknown error",
                LocalDateTime.now()));
    }

}
