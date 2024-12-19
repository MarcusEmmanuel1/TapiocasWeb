package com.netolanches.Tapiocas

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SalesRepository : JpaRepository<Sales, Long> {
  // Altere o nome do método para corresponder ao campo 'cpf'
  fun findByCpf(cpf: String): List<Sales>  // Mudado para 'findByCpf'
}
