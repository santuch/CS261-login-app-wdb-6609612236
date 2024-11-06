package com.example.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.crud.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Additional query methods can be added if needed
}
