package pe.gob.ceabeserviceauth.controller;

import org.jboss.resteasy.annotations.jaxrs.QueryParam;
import org.springframework.http.HttpStatus;
import pe.gob.ceabeserviceauth.dto.ResponseKeycloak;
import pe.gob.ceabeserviceauth.model.Category;
import pe.gob.ceabeserviceauth.model.Report;
import pe.gob.ceabeserviceauth.model.Supplier;
import pe.gob.ceabeserviceauth.model.UserKeycloak;
import pe.gob.ceabeserviceauth.service.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.ceabeserviceauth.service.ReportService;
import pe.gob.ceabeserviceauth.service.SupplierService;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private KeycloakService keycloakService;

    @Autowired
    private ReportService reportService;
//
//    @GetMapping("/exists/{ruc}")
//    public ResponseEntity<Object> exist(@PathVariable("ruc") String ruc) {
//        Optional<Supplier> data = supplierService.findByRuc(ruc);
//        if (data.isPresent()) {
//            return ResponseEntity.status(HttpStatus.OK).body(data.get());
//        }
//        return ResponseEntity.status(400).build();
//    }

    @PostMapping("/register")
    public ResponseEntity<ResponseKeycloak> create(@RequestBody Supplier supplier) {
        UserKeycloak userKeycloak = new UserKeycloak(supplier.getRuc(), supplier.getEmail(), supplier.getBusinessName(), supplier.getRepresentative(), supplier.getRuc());
        ResponseKeycloak responseKeycloak = keycloakService.createUser(userKeycloak);
        System.out.println(responseKeycloak.getId());
        if (responseKeycloak.isSuccess()) {
            supplier.setId(responseKeycloak.getId());

//            List<Category> categories = new ArrayList<>();
//            for (Category category : supplier.categories) {
//                category.setSupplier(supplier);
//                categories.add(category);
//            }
//            supplier.setCategories(categories);

            supplierService.create(supplier);

            try {
                return ResponseEntity.status(responseKeycloak.getStatus()).body(responseKeycloak);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(responseKeycloak.getStatus()).body(responseKeycloak);
        }
    }

    @GetMapping("/list")
    public List<Supplier> list() {
        return supplierService.list();
    }

    @PutMapping("/{ruc}")
    public ResponseEntity<Supplier> update(@PathVariable("ruc") String ruc, @RequestBody Supplier body) {

        Optional<Supplier> data = supplierService.findByRuc(ruc);
        if (data.isPresent()) {
            Supplier _supplier = data.get();
            _supplier.setEmail(body.getEmail());
            _supplier.setRepresentative(body.getRepresentative());
            _supplier.setPhone(body.getPhone());
            _supplier.setCellphone(body.getCellphone());

            // Category
            _supplier.setCategories(body.getCategories());

            // Contacts
            _supplier.setContacts(body.getContacts());

            return ResponseEntity.status(HttpStatus.OK).body(supplierService.save(_supplier));
        }

        return ResponseEntity.status(400).build();
    }

    //    @RolesAllowed("ceabe-user")
    @GetMapping("/{ruc}")
    public ResponseEntity<Supplier> detail(@PathVariable("ruc") String ruc) {
        return supplierService.findByRuc(ruc)
                .map(value -> ResponseEntity.status(200).body(value))
                .orElseGet(() -> ResponseEntity.status(400).build());
    }

    @PostMapping("/report")
    public ResponseEntity<Report> report(@RequestBody Report report) {
        Report reportNew = reportService.create(report);
        try {
            return ResponseEntity.status(201).body(reportNew);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }


}

