/*
 * Java domain class for entity "${className}"
 * Generated on ${timestamp}
 */
package ${packageName};

import ${packageName}.${className};
import ${packageName}.${className}DTO;

import java.util.ArrayList;
import java.util.List;

${mapperImports}
/**
 * Mapper class for entity "${className}"
 *
 * @author Sigit Trinugroho (stk)
 * @version 1.0.0
 *
 */

public class ${className}Mapper {

    public static ${className}DTO toDTO(${className} o) {
        ${className}DTO dto = new ${className}DTO();

${mapperSetters}

        return dto;
    }

    public static List<${className}DTO> toDTO(List<${className}> array) {
        List<${className}DTO> dtos = new ArrayList<${className}DTO>();

        for(${className} o : array) {
            ${className}DTO dto = toDTO(o);
            dtos.add(dto);
        }

        return dtos;
    }
}
