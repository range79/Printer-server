package com.xtech.printerserver.file.exception

import org.springframework.http.HttpStatus

class WrongFileFormatException(msg: String): AbstractExceptionHandler(msg, HttpStatus.BAD_REQUEST) {
}