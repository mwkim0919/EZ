package com.ez.ezbackend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages = {
    "com.ez.ezbackend.budget.repository",
    "com.ez.ezbackend.shared.repository"
})
@EnableTransactionManagement
public class H2JpaConfig {

  @Inject
  private Environment env;

  @Bean
  @Profile("Test")
  public DataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("org.h2.driver");
    dataSource.setUrl("jdbc:h2:mem:db;DB_CLOSE_DELAY=-1");
    dataSource.setUsername("sa");
    dataSource.setPassword("sa");
    return dataSource;
  }

  @Bean
  LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
    entityManager.setDataSource(dataSource());
    entityManager.setPackagesToScan(
        "com.ez.ezbackend.budget.repository",
        "com.ez.ezbackend.shared.repository",
        "com.ez.ezbackend.budget.entity",
        "com.ez.ezbackend.shared.entity");
    entityManager.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
    entityManager.setJpaProperties(additionalProperties());
    return entityManager;
  }

  @Bean
  JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
    JpaTransactionManager transactionManager = new JpaTransactionManager();
    transactionManager.setEntityManagerFactory(entityManagerFactory);
    return transactionManager;
  }

  Properties additionalProperties() {
    Properties hibernateProperties = new Properties();
    hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
    hibernateProperties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
    hibernateProperties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
    hibernateProperties.setProperty("hibernate.format_sql", env.getProperty("hibernate.format_sql"));
    hibernateProperties.setProperty("hibernate.generate_statistics", env.getProperty("hibernate.generate_statistics"));
    return hibernateProperties;
  }
}
