package com.ez.ezbackend;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {EzBackendApplication.class, H2JpaConfig.class})
@ActiveProfiles("test")
public abstract class DatabaseIntegrationTest {
}
