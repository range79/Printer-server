package com.xtech.printerserver.exception

import org.springframework.http.HttpStatus

class PrinterException(msg: String): AbstractExceptionHandler(msg, HttpStatus.INTERNAL_SERVER_ERROR) {
}