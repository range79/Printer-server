package com.xtech.printerserver.file.service;


import com.xtech.printerserver.file.dto.MyFileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface FileService {
    Page<MyFileResponse> getAllFiles(Pageable pageable);
    MyFileResponse getFile(Long id);
    void saveFile(MultipartFile file) throws IOException;
    void deleteFile(Long id);
    void printFile(Long id);
}
