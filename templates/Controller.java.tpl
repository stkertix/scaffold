package ${packageName}.controller;

import ${packageName}.entity.${className};
import ${packageName}.service.${className}Service;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/${tableName}")
public class ${className}Controller {

    private final ${className}Service service;

    public ${className}Controller(${className}Service service) {
        this.service = service;
    }

    @GetMapping
    public List<${className}> all() {
        return service.findAll();
    }

    @PostMapping
    public ${className} create(@RequestBody ${className} entity) {
        return service.save(entity);
    }
}
