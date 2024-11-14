import * as z from "zod";

const addressSchema = z.object({
  first_name: z
    .string()
    .min(1, "Le prénom du destinataire est requis.")
    .max(50, "Le prénom du destinataire ne peut pas dépasser 50 caractères."),

  last_name: z
    .string()
    .min(1, "Le nom du destinataire est requis.")
    .max(50, "Le nom du destinataire ne peut pas dépasser 50 caractères."),

  company: z
    .string()
    .max(100, "Le nom de l'entreprise ne peut pas dépasser 100 caractères."),

  address_1: z
    .string()
    .min(1, "L'adresse principale est requise.")
    .max(100, "L'adresse principale ne peut pas dépasser 100 caractères."),

  address_2: z
    .string()
    .optional(),

  city: z
    .string()
    .min(1, "La ville est requise.")
    .max(100, "Le nom de la ville ne peut pas dépasser 100 caractères."),

  state: z
    .string()
    .min(1, "L'état ou la région est requis.")
    .max(100, "L'état ou la région ne peut pas dépasser 100 caractères."),

  postcode: z
    .string()
    .min(1, "Le code postal est requis.")
    .regex(/^\d{5}$/, "Le code postal doit être un nombre de 5 chiffres (ex : 75001)."),

  country: z
    .string()
    .min(2, "Le code pays doit comporter 2 lettres (ex : FR).")
    .max(2, "Le code pays doit comporter 2 lettres (ex : FR).")
    .toUpperCase(),

  email: z
    .string()
    .email({ message: "L'adresse e-mail fournie n'est pas valide." }),

  phone: z
    .string()
    .regex(
      /^((\+33|0)[1-9](\d{2}){4})$/,
      "Numéro de téléphone invalide. Veuillez entrer un numéro de téléphone français valide (ex : +33 6 12 34 56 78)."
    ),
});

export { addressSchema };
