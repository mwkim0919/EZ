package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.RestIntegrationTest;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.model.TransactionModel;
import com.ez.ezbackend.budget.service.TransactionService;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import com.ez.ezbackend.util.TestUtil;
import org.junit.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TransactionControllerTest extends RestIntegrationTest {
  @Inject
  private MockMvc mockMvc;

  @MockBean
  private TransactionService transactionService;

  @Test
  public void test_getTransactionsForUser_success() throws Exception {
    when(transactionService.getTransactionsForUser(1)).thenReturn(Collections.emptyList());
    mockMvc.perform(get("/users/1/transactions")).andDo(print()).andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  public void test_getTransactionsForUser_failure() throws Exception {
    when(transactionService.getTransactionsForUser(1)).thenThrow(new EzNotFoundException("Not found"));
    mockMvc.perform(get("/users/1/transactions")).andDo(print()).andExpect(status().isNotFound());
  }

  @Test
  public void test_saveTransactionForUser_success() throws Exception {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.now())
        .build();
    Transaction transaction = TransactionModel.convertToTransaction(transactionRequest, User.builder().build(), 1L);
    String json = TestUtil.convertToJson(transactionRequest, TransactionModel.class);
    when(transactionService.saveTransactionForUser(any(TransactionModel.class), any(long.class))).thenReturn(transaction);
    mockMvc
        .perform(post("/users/1/transactions")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isCreated());
  }

  @Test
  public void test_saveTransactionForUser_failure() throws Exception {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.now())
        .build();
    String json = TestUtil.convertToJson(transactionRequest, TransactionModel.class);
    when(transactionService.saveTransactionForUser(any(TransactionModel.class), any(long.class)))
        .thenThrow(new EzReadOnlyException("Id should be read-only."));
    mockMvc
        .perform(post("/users/1/transactions")
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
    String json = TestUtil.convertToJson(transactionRequest, TransactionModel.class);
    when(transactionService.updateTransactionForUser(any(TransactionModel.class), any(long.class), any(long.class)))
        .thenReturn(transaction);
    mockMvc
        .perform(put("/users/1/transactions/1")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  public void test_deleteTransactionForUser_success() throws Exception {
    doNothing().when(transactionService).deleteTransactionForUser(any(long.class), any(long.class));
    mockMvc.perform(delete("/users/1/transactions/1")).andExpect(status().isAccepted());
  }
}
