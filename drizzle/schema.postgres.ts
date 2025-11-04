import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role").$type<"user" | "admin">().default("user").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de propostas de viagem
 */
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  
  // Nome do pacote
  packageName: text("packageName"),
  
  // Informações do cliente
  clientName: text("clientName").notNull(),
  departureDate: text("departureDate").notNull(),
  returnDate: text("returnDate").notNull(),
  
  // Passageiros
  adults: integer("adults").notNull().default(2),
  children: integer("children").notNull().default(0),
  childrenAges: text("childrenAges"), // JSON array de idades das crianças
  
  // Duração da viagem
  days: integer("days"),
  nights: integer("nights"),
  
  // Imagem de capa
  coverImageUrl: text("coverImageUrl"),
  
  // Hotel
  hotelName: text("hotelName"),
  hotelPhotos: text("hotelPhotos"), // JSON array de URLs
  
  // Itens inclusos (JSON array de strings)
  includedItems: text("includedItems").notNull(),
  
  // Valores (em centavos)
  pricePerPerson: integer("pricePerPerson").notNull(),
  totalPrice: integer("totalPrice").notNull(),
  
  // Formas de pagamento
  downPayment: integer("downPayment").notNull(),
  installments: integer("installments").notNull(),
  installmentValue: integer("installmentValue").notNull(),
  firstInstallmentDate: text("firstInstallmentDate"),
  installmentDates: text("installmentDates").notNull(), // JSON array de datas
  
  // Contatos
  phoneNumber: text("phoneNumber"),
  email: text("email"),
  instagramUrl: text("instagramUrl"),
  
  // Metadados
  createdBy: integer("createdBy").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  
  // Rastreamento de status
  status: text("status").$type<"pending" | "viewed" | "approved" | "expired">().default("pending").notNull(),
  viewedAt: timestamp("viewedAt"),
  approvedAt: timestamp("approvedAt"),
  expiresAt: timestamp("expiresAt"),
  viewCount: integer("viewCount").default(0).notNull(),
});

export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = typeof proposals.$inferInsert;
