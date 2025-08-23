package com.xtech.printerserver.file.exception

import org.springframework.http.HttpStatus


open class AbstractExceptionHandler(message: String?, val httpStatus: HttpStatus) : RuntimeException(message)