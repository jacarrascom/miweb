package pe.gob.ceabeserviceauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.ceabeserviceauth.model.Report;
import pe.gob.ceabeserviceauth.model.Supplier;
import pe.gob.ceabeserviceauth.repository.ReportRepository;
import pe.gob.ceabeserviceauth.repository.SupplierRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Report create(Report report) {
        return reportRepository.save(report);
    }

    public Optional<Report> findById(long id) {
        return reportRepository.findById(id);
    }

}
