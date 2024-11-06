package com.example.crud;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String type; // Possible values: "student" or "employee"

    @Column(name = "display_name_th", columnDefinition = "NVARCHAR(255)")
    private String displayNameTh;
    
    @Column(name = "display_name_en", columnDefinition = "NVARCHAR(255)")
    private String displayNameEn;

    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(columnDefinition = "NVARCHAR(255)")
    private String department;
    
    @Column(columnDefinition = "NVARCHAR(255)")
    private String faculty;

    @Column(name = "tu_status")
    private String tuStatus;

    @Column(name = "status_work")
    private String statusWork;

    @Column(name = "status_emp")
    private String statusEmp;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDisplayNameTh() {
        return displayNameTh;
    }

    public void setDisplayNameTh(String displayNameTh) {
        this.displayNameTh = displayNameTh;
    }

    public String getDisplayNameEn() {
        return displayNameEn;
    }

    public void setDisplayNameEn(String displayNameEn) {
        this.displayNameEn = displayNameEn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTuStatus() {
        return tuStatus;
    }

    public void setTuStatus(String tuStatus) {
        this.tuStatus = tuStatus;
    }

    public String getStatusWork() {
        return statusWork;
    }

    public void setStatusWork(String statusWork) {
        this.statusWork = statusWork;
    }

    public String getStatusEmp() {
        return statusEmp;
    }

    public void setStatusEmp(String statusEmp) {
        this.statusEmp = statusEmp;
    }
}
