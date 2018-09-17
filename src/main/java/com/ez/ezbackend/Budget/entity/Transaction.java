package com.ez.ezbackend.Budget.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String description;

    private Integer withdraw;

    private Integer deposit;

    @CreationTimestamp
    private LocalDateTime createDatetime;

    private LocalDateTime transactionDatetime;

    @ManyToOne
    @JsonIgnore
    private User user;

//    private Long userId;

//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "transaction")
//    private Category category;

    protected Transaction() {}

    public Transaction(String description, Integer withdraw, Integer deposit, LocalDateTime createDatetime, LocalDateTime transactionDatetime, User user) {
        this.description = description;
        this.withdraw = withdraw;
        this.deposit = deposit;
        this.createDatetime = createDatetime;
        this.transactionDatetime = transactionDatetime;
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", withdraw=" + withdraw +
                ", deposit=" + deposit +
                ", createDatetime=" + createDatetime +
                ", transactionDatetime=" + transactionDatetime +
                ", user=" + user +
                '}';
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getWithdraw() {
        return withdraw;
    }

    public void setWithdraw(Integer withdraw) {
        this.withdraw = withdraw;
    }

    public Integer getDeposit() {
        return deposit;
    }

    public void setDeposit(Integer deposit) {
        this.deposit = deposit;
    }

    public LocalDateTime getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(LocalDateTime createDatetime) {
        this.createDatetime = createDatetime;
    }

    public LocalDateTime getTransactionDatetime() {
        return transactionDatetime;
    }

    public void setTransactionDatetime(LocalDateTime transactionDatetime) {
        this.transactionDatetime = transactionDatetime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
