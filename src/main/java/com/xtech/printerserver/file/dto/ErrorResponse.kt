package com.xtech.printerserver.file.dto

import java.time.LocalDateTime

@JvmRecord
data class ErrorResponse(
    val message: String?,
    val cause: String?,
    val time: LocalDateTime
)
