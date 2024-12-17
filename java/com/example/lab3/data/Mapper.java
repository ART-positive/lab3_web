package com.example.lab3.data;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import java.io.Serializable;

@Named("mapper")
@SessionScoped
public class Mapper implements Serializable {
    private String currentPage = "index";

    // Метод для изменения текущей страницы
    public String remap(String target) {
        currentPage = target;
        return target;
    }

    // Метод для получения текущей страницы
    public String getMapping() {
        return currentPage;
    }
}
