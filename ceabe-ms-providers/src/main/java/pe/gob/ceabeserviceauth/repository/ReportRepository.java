package pe.gob.ceabeserviceauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.gob.ceabeserviceauth.model.Report;
import pe.gob.ceabeserviceauth.model.Supplier;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {


    Optional<Report> findByRuc(String ruc);

}
