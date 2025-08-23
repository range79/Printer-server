package com.xtech.printerserver.file.service.impl;

import com.xtech.printerserver.file.dto.MyFileResponse;
import com.xtech.printerserver.file.exception.FileNotFoundException;
import com.xtech.printerserver.file.exception.PrinterException;
import com.xtech.printerserver.file.exception.WrongFileFormatException;
import com.xtech.printerserver.file.model.MyFile;
import com.xtech.printerserver.file.repository.FileRepository;
import com.xtech.printerserver.file.service.FileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.print.*;
import java.io.ByteArrayInputStream;
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

        String filename = file.getOriginalFilename();

        if (filename == null ||
                !(filename.endsWith(".pdf")
                        || filename.endsWith(".doc")
                        || filename.endsWith(".docx"))) {
            throw new WrongFileFormatException("Unsupported file format");
        }
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

    @Override
    public void printFile(Long id) {
        MyFile file = findFile(id);

        try {

            PrintService printer = PrintServiceLookup.lookupDefaultPrintService();
            if (printer == null) {
                throw new PrinterException("Default printer not found!");
            }
            DocPrintJob job = printer.createPrintJob();


            ByteArrayInputStream basis = new ByteArrayInputStream(file.getBytes());


            DocFlavor flavor;
            if (file.getName().endsWith(".pdf")) {
                flavor = DocFlavor.INPUT_STREAM.PDF;
            } else {
                flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
            }
            Doc doc = new SimpleDoc(basis, flavor, null);
            job.print(doc, null);

        } catch (Exception e) {
            throw new PrinterException("Printing error: " + e.getMessage());
        }
    }

    private MyFileResponse fileMapper(MyFile file) {
        return new MyFileResponse(file.getId(),file.getName());
    }
    private MyFile findFile(Long id){
        return fileRepository.findById(id).orElseThrow(() -> new FileNotFoundException("File not found"));
    }
}
