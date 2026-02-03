import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export type InsuranceType = "commercial" | "selfpay" | "medicare" | "medicaid" | "";

interface InsurancePrequalificationProps {
  insuranceType: InsuranceType;
  onInsuranceTypeChange: (value: InsuranceType) => void;
  medicationAcknowledged: boolean;
  onMedicationAcknowledgedChange: (value: boolean) => void;
  showMedicationAcknowledgment?: boolean;
  compact?: boolean;
}

const INSURANCE_OPTIONS = [
  { value: "commercial", label: "Commercial / PPO Insurance" },
  { value: "selfpay", label: "Self-Pay" },
  { value: "medicare", label: "Medicare" },
  { value: "medicaid", label: "Medicaid / Sunshine Health" },
] as const;

export function InsurancePrequalification({
  insuranceType,
  onInsuranceTypeChange,
  medicationAcknowledged,
  onMedicationAcknowledgedChange,
  showMedicationAcknowledgment = true,
  compact = false,
}: InsurancePrequalificationProps) {
  const isMedicaidSelected = insuranceType === "medicaid";

  return (
    <div className={`space-y-${compact ? '3' : '4'}`}>
      {/* Insurance Type Selection */}
      <div className="space-y-2">
        <Label className="text-foreground font-medium">
          How will you be paying? *
        </Label>
        <RadioGroup
          value={insuranceType}
          onValueChange={(value) => onInsuranceTypeChange(value as InsuranceType)}
          className={`${compact ? 'space-y-1.5' : 'space-y-2'}`}
        >
          {INSURANCE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`insurance-${option.value}`}
                data-testid={`radio-insurance-${option.value}`}
              />
              <Label
                htmlFor={`insurance-${option.value}`}
                className={`font-normal cursor-pointer ${compact ? 'text-sm' : ''}`}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Medicaid/Sunshine Health rejection message */}
        {isMedicaidSelected && (
          <div
            className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm"
            role="alert"
            data-testid="alert-medicaid-not-accepted"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              Thanks for checking — we're not able to accept Medicaid or Sunshine Health plans at this time.
              If you'd like to proceed as self-pay, please select that option above.
            </p>
          </div>
        )}
      </div>

      {/* Medication Acknowledgment Checkbox */}
      {showMedicationAcknowledgment && !isMedicaidSelected && insuranceType && (
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="medication-acknowledgment"
              checked={medicationAcknowledged}
              onCheckedChange={(checked) => onMedicationAcknowledgedChange(checked === true)}
              data-testid="checkbox-medication-acknowledgment"
              className="mt-0.5"
            />
            <Label
              htmlFor="medication-acknowledgment"
              className={`font-normal cursor-pointer leading-relaxed ${compact ? 'text-sm' : ''}`}
            >
              I understand this clinic does not prescribe benzodiazepines (Xanax, Klonopin, Ativan) as a primary treatment.
            </Label>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Validates that the insurance prequalification requirements are met
 * Returns an error message if invalid, or null if valid
 */
export function validateInsurancePrequalification(
  insuranceType: InsuranceType,
  medicationAcknowledged: boolean,
  requireMedicationAcknowledgment: boolean = true
): string | null {
  if (!insuranceType) {
    return "Please select how you will be paying.";
  }

  if (insuranceType === "medicaid") {
    return "We're unable to accept Medicaid or Sunshine Health plans at this time.";
  }

  if (requireMedicationAcknowledgment && !medicationAcknowledged) {
    return "Please acknowledge the medication policy to continue.";
  }

  return null;
}
