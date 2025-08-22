package com.xtech.printerserver.file.exception;

import org.springframework.http.HttpStatus;

public class FileNotFoundException extends AbstractExceptionHandler {
    public FileNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
