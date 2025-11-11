/*
 * Java repository interface for entity "${className}"
 * Generated on ${timestamp}
 */
package ${packageName};

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Repository interface for entity "${className}"
 *
 * @author stk
 * @version 1.0.0
 */

public interface ${className}Repository extends JpaRepository<${className}, String>, JpaSpecificationExecutor<${className}> {

}
