package com.xtech.printerserver.user.exception;

public class DatabaseException extends RuntimeException {
  public DatabaseException(String message) {
    super("database error: " + message);
  }
}
