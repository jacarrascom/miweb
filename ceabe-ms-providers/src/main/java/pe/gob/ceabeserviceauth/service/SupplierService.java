package pe.gob.ceabeserviceauth.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.ceabeserviceauth.model.Supplier;
import pe.gob.ceabeserviceauth.repository.SupplierRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier create(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Optional<Supplier> findById(long id) {
        return supplierRepository.findById(id);
    }

    public List<Supplier> list() {
        return supplierRepository.findAll();
    }

    public void delete(Supplier supplier) {
        supplierRepository.delete(supplier);
    }

    public Optional<Supplier> findByRuc(String ruc) {
        return supplierRepository.findByRuc(ruc);
    }

    public Supplier update(Supplier supplier) {
//        return supplierRepository.u
        return null;
    }

    public Supplier save(Supplier supplier) {
        return supplierRepository.save(supplier);
    }
}
