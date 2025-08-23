package com.xtech.printerserver.controller;

import com.xtech.printerserver.dto.MyFileResponse;
import com.xtech.printerserver.service.FileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
    @GetMapping("/all")
    public Page<MyFileResponse> getAllFiles(@PageableDefault(size = 20, sort = "id") Pageable pageable){
        return fileService.getAllFiles(pageable);
    }
    @GetMapping("/{id}")
    public MyFileResponse getFile(@PathVariable Long id){
        return fileService.getFile(id);
    }
    @PostMapping("/save")
    public void saveFile(@RequestParam("file") MultipartFile file) throws IOException {
        fileService.saveFile(file);
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete/{id}")
    public void deleteFile(@PathVariable Long id){
        fileService.deleteFile(id);
    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/print/{id}")
    public void printFile(@PathVariable Long id){
        fileService.printFile(id);
    }

}
