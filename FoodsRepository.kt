package com.netolanches.Tapiocas

import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Entity
@Table(name = "foods")
data class Foods(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  val id: Long? = null,  // ID como Long
  val name: String,
  val price: Float
)

@Repository
interface FoodsRepository : JpaRepository<Foods, Long> {  // Mudado para Long
  fun findByName(name: String): List<Foods>
}
