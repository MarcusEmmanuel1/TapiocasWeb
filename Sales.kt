package com.netolanches.Tapiocas

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "sales")
data class Sales(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "idfood", nullable = false)
    val food: Foods,
    val cpf: String,
    val description: String,
    val value: Float,

    @Column(name = "datesale")
    val datesale: LocalDate  // Usando LocalDate para representar a data
)