package com.example.Aviso.controller;

import com.example.Aviso.model.Aviso;
import com.example.Aviso.repository.AvisoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avisos")
public class AvisoController {

    @Autowired
    private AvisoRepository avisoRepository;

    @GetMapping
    public List<Aviso> listarAvisos() {
        return avisoRepository.findAll();
    }

    @PostMapping
    public Aviso criarAviso(@RequestBody Aviso aviso) {
        return avisoRepository.save(aviso);
    }

    @PutMapping("/{id}")
    public Aviso atualizarAviso(@PathVariable Long id, @RequestBody Aviso aviso) {
        aviso.setId(id);
        return avisoRepository.save(aviso);
    }

    @DeleteMapping("/{id}")
    public void deletarAviso(@PathVariable Long id) {
        avisoRepository.deleteById(id);
    }
}
