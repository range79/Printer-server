package com.xtech.printerserver.exception

import org.springframework.http.HttpStatus

class FileNotFoundException(message: String?) : AbstractExceptionHandler(message, HttpStatus.NOT_FOUND)
