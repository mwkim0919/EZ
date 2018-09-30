package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.model.TransactionModel;
import com.ez.ezbackend.budget.service.TransactionService;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import com.ez.ezbackend.shared.util.JsonUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(
    controllers = TransactionController.class,
    secure = false
)
public class TransactionControllerTest {
  @Inject
  private MockMvc mockMvc;

  @MockBean
  private TransactionService transactionService;

  @Test
  public void test_getTransactionsForUser_success() throws Exception {
    when(transactionService.getTransactionsForUser(1)).thenReturn(Collections.emptyList());
    mockMvc.perform(get("/api/users/1/transactions"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  public void test_getTransactionsForUser_failure() throws Exception {
    when(transactionService.getTransactionsForUser(1)).thenThrow(new EzNotFoundException("Not found"));
    mockMvc.perform(get("/api/users/1/transactions"))
        .andDo(print())
        .andExpect(status().isNotFound());
  }

  @Test
  public void test_saveTransactionForUser_success() throws Exception {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.now())
        .build();
    Transaction transaction = TransactionModel.convertToTransaction(transactionRequest, User.builder().build(), 1L);
    String json = JsonUtil.convertToJson(transactionRequest, TransactionModel.class);
    when(transactionService.saveTransactionForUser(any(TransactionModel.class), any(long.class))).thenReturn(transaction);
    mockMvc
        .perform(post("/api/users/1/transactions")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value("1"))
        .andExpect(jsonPath("$.description").value("test"))
        .andExpect(jsonPath("$.withdraw").value("100.00"))
        .andExpect(jsonPath("$.deposit").doesNotExist())
        .andExpect(jsonPath("$.transactionDatetime").exists());
  }

  @Test
  public void test_saveTransactionForUser_failure() throws Exception {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.now())
        .build();
    String json = JsonUtil.convertToJson(transactionRequest, TransactionModel.class);
    when(transactionService.saveTransactionForUser(any(TransactionModel.class), any(long.class)))
        .thenThrow(new EzReadOnlyException("Id should be read-only."));
    mockMvc
        .perform(post("/api/users/1/transactions")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isBadRequest());
  }

  @Test
  public void test_updateTransactionForUser_success() throws Exception {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.now())
        .build();
    Transaction transaction = TransactionModel.convertToTransaction(transactionRequest, User.builder().build(), 1L);
    String json = JsonUtil.convertToJson(transactionRequest, TransactionModel.class);
    when(transactionService.updateTransactionForUser(any(TransactionModel.class), any(long.class), any(long.class)))
        .thenReturn(transaction);
    mockMvc
        .perform(put("/api/users/1/transactions/1")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value("1"))
        .andExpect(jsonPath("$.description").value("test"))
        .andExpect(jsonPath("$.withdraw").value("100.00"))
        .andExpect(jsonPath("$.deposit").doesNotExist())
        .andExpect(jsonPath("$.transactionDatetime").exists());
  }

  @Test
  public void test_deleteTransactionForUser_success() throws Exception {
    doNothing().when(transactionService).deleteTransactionForUser(any(long.class), any(long.class));
    mockMvc.perform(delete("/api/users/1/transactions/1")).andExpect(status().isAccepted());
  }
}
