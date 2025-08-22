package com.xtech.printerserver.file.service.impl;

import com.xtech.printerserver.file.dto.MyFileResponse;
import com.xtech.printerserver.file.exception.FileNotFoundException;
import com.xtech.printerserver.file.model.MyFile;
import com.xtech.printerserver.file.repository.FileRepository;
import com.xtech.printerserver.file.service.FileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileServiceImpl implements FileService {
    private final FileRepository fileRepository;
    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }
    @Override
    public Page<MyFileResponse> getAllFiles(Pageable pageable) {
        return fileRepository.findAll(pageable).map(this::fileMapper);
    }

    @Override
    public MyFileResponse getFile(Long id) {
        MyFile file =findFile(id);
        return new MyFileResponse(file.getId(),file.getName());

    }

    @Override
    public void saveFile(MultipartFile file) throws IOException {
        MyFile fileObj = new MyFile();
        fileObj.setName(file.getOriginalFilename());
        fileObj.setBytes(file.getBytes());
        fileRepository.save(fileObj);
    }

    @Override
    public void deleteFile(Long id) {
        MyFile file  =findFile(id);
        fileRepository.delete(file);
    }
    private MyFileResponse fileMapper(MyFile file) {
        return new MyFileResponse(file.getId(),file.getName());
    }
    private MyFile findFile(Long id){
        return fileRepository.findById(id).orElseThrow(() -> new FileNotFoundException("File not found"));
    }
}
