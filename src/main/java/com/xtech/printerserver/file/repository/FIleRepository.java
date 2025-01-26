package com.xtech.printerserver.file.repository;

import com.xtech.printerserver.file.model.MyFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FIleRepository extends JpaRepository<MyFile, Long> {
}
