package com.netolanches.Tapiocas

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import com.netolanches.Tapiocas.SalesRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@RestController
class TapiocasController(
  @Autowired val foodsRepository: FoodsRepository, // Injeção de dependência
  val filingsRepository: FilingsRepository,
  val salesRepository: SalesRepository
) {

  @GetMapping("/food")
  fun getFilingsByFoodId(@RequestParam("id") id: Int): Map<String, Any> {  // Alterado de Long para Int
    try {
      val food = foodsRepository.findById(id.toLong())  // Correção: passe o valor 'id' convertido para Long
      val filings = filingsRepository.getAllFilingsByFoodId(id)

      val response = mapOf(
        "price" to food.get().price,
        "filings" to filings
      )

      return response
    } catch (e: Exception) {
      return mapOf("error" to e.message.toString())
    }
  }

  @GetMapping("/history")
  fun getAllSalesByCpfClient(@RequestParam("cpf") cpf: String): List<Sales> {
    return salesRepository.findByCpf(cpf)  // Alterado para 'findByCpf'
  }

  @PostMapping("/payment")
  fun makePayment(@RequestBody sale: Sales): Map<String, String> {
    return try {
      salesRepository.save(sale)
      mapOf("message" to "Compra registrada com sucesso!")
    } catch (e: Exception) {
      mapOf("error" to e.message.toString())
    }
  }
}