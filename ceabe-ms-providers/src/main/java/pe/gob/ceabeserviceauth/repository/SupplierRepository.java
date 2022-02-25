package pe.gob.ceabeserviceauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.gob.ceabeserviceauth.model.Supplier;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {


    //    @Query("Select s from Supplier s  where s.ruc and ?1 ")
    Optional<Supplier> findByRuc(String ruc);

}
