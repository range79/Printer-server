package com.xtech.printerserver.file.service;

import java.io.File;
import java.util.List;

public interface FileService {
    List<File> getallFiles();
    File getFile(String filename);

}
