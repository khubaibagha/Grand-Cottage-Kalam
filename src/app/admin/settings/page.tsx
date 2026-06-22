"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSettings, resetMockData, updateSettings } from "@/lib/data";
import type { Settings } from "@/lib/data";

export default function AdminSettingsPage() {
  const [loading, setLoading] = React.useState(true);
  const [settings, setSettings] = React.useState<Settings | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [resetting, setResetting] = React.useState(false);

  React.useEffect(() => {
    getSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateBank<K extends keyof Settings["bankDetails"]>(
    key: K,
    value: Settings["bankDetails"][K],
  ) {
    setSettings((prev) =>
      prev
        ? { ...prev, bankDetails: { ...prev.bankDetails, [key]: value } }
        : prev,
    );
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await updateSettings(settings);
      setSettings(updated);
      toast.success("Settings saved.");
    } catch {
      toast.error("Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setResetting(true);
    try {
      await resetMockData();
      const fresh = await getSettings();
      setSettings(fresh);
      toast.success("Demo data reset to defaults.");
    } catch {
      toast.error("Could not reset demo data.");
    } finally {
      setResetting(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-stone">
        <Loader2 className="size-5 animate-spin" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl text-ink">Settings</h1>
        <p className="mt-1 text-sm text-stone">
          Booking rules, contact details, and payment accounts.
        </p>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
        <h2 className="font-heading text-lg text-ink">Booking rules</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Advance payment (%)</Label>
            <Input
              type="number"
              value={settings.advancePercent}
              onChange={(e) => update("advancePercent", Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Check-in time</Label>
            <Input
              value={settings.checkinTime}
              onChange={(e) => update("checkinTime", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Check-out time</Label>
            <Input
              value={settings.checkoutTime}
              onChange={(e) => update("checkoutTime", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
        <h2 className="font-heading text-lg text-ink">Contact details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Phone</Label>
            <Input
              value={settings.contactPhone}
              onChange={(e) => update("contactPhone", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>WhatsApp</Label>
            <Input
              value={settings.contactWhatsapp}
              onChange={(e) => update("contactWhatsapp", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={settings.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Address</Label>
            <Input
              value={settings.address}
              onChange={(e) => update("address", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
        <h2 className="font-heading text-lg text-ink">Payment accounts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Bank name</Label>
            <Input
              value={settings.bankDetails.bankName}
              onChange={(e) => updateBank("bankName", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Account title</Label>
            <Input
              value={settings.bankDetails.accountTitle}
              onChange={(e) => updateBank("accountTitle", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Account number</Label>
            <Input
              value={settings.bankDetails.accountNumber}
              onChange={(e) => updateBank("accountNumber", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>IBAN</Label>
            <Input
              value={settings.bankDetails.iban}
              onChange={(e) => updateBank("iban", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>JazzCash number</Label>
            <Input
              value={settings.jazzcashNumber}
              onChange={(e) => update("jazzcashNumber", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Easypaisa number</Label>
            <Input
              value={settings.easypaisaNumber}
              onChange={(e) => update("easypaisaNumber", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
        <div>
          <p className="text-sm font-medium text-ink">Reset demo data</p>
          <p className="text-xs text-stone">
            Restores all bookings, pricing, and settings to their original seed
            values.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={resetting}>
            {resetting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <RotateCcw className="size-4" />
            )}
            Reset to defaults
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save settings
          </Button>
        </div>
      </div>
    </div>
  );
}
