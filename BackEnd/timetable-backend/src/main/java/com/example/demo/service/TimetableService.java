package com.example.demo.service;

import com.example.demo.model.TimetableEntry;
import com.example.demo.repository.TimetableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimetableService {

    private final TimetableRepository repository;

    public TimetableService(TimetableRepository repository) {
        this.repository = repository;
    }

    public List<TimetableEntry> getAllEntries() {
        return repository.findAll();
    }

    public Optional<TimetableEntry> getEntryById(Long id) {
        return repository.findById(id);
    }

    public TimetableEntry addEntry(TimetableEntry entry) {
        return repository.save(entry);
    }

    public TimetableEntry updateEntry(TimetableEntry entry) {
        return repository.save(entry);
    }

    public void deleteEntry(Long id) {
        repository.deleteById(id);
    }
}
