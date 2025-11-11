/*
 * Java domain class for entity "${className}"
 * Generated on ${timestamp}
 */
package ${packageName};

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;
import org.nacindonesia.constant.EntityDomain;
import org.nacindonesia.model.BaseEntity;

${entityImports}
/**
 * Domain class for entity "${className}"
 *
 * @author Sigit Trinugroho (stk)
 * @version 1.0.0
 *
 */

@Entity
@Table(name = "${tableName}")
public class ${className} extends BaseEntity {

    private static final long serialVersionUID = 1L;

${entityFields}
${entityGetterSetters}
}
