package com.ez.ezbackend;

import com.ez.ezbackend.budget.controller.TransactionController;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {
    TransactionController.class
})
public abstract class RestIntegrationTest {
}
