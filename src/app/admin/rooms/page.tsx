"use client";

import * as React from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addSeasonalRule,
  getRoomTypes,
  getSeasonalPricing,
  removeSeasonalRule,
  updateRoomType,
} from "@/lib/data";
import type { RoomType, SeasonalPriceRule } from "@/lib/data";
import { formatDateLong, formatPKR } from "@/lib/format";

export default function AdminRoomsPage() {
  const [loading, setLoading] = React.useState(true);
  const [roomTypes, setRoomTypes] = React.useState<RoomType[]>([]);
  const [rules, setRules] = React.useState<SeasonalPriceRule[]>([]);
  const [savingId, setSavingId] = React.useState<string | null>(null);

  const [ruleRoomId, setRuleRoomId] = React.useState("");
  const [ruleLabel, setRuleLabel] = React.useState("");
  const [ruleRange, setRuleRange] = React.useState<DateRange | undefined>();
  const [rulePrice, setRulePrice] = React.useState("");
  const [addingRule, setAddingRule] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const isWideScreen = useMediaQuery("(min-width: 640px)");

  React.useEffect(() => {
    Promise.all([getRoomTypes(), getSeasonalPricing()]).then(([rooms, sp]) => {
      setRoomTypes(rooms);
      setRules(sp);
      setRuleRoomId(rooms[0]?.id ?? "");
      setLoading(false);
    });
  }, []);

  async function handleSave(
    room: RoomType,
    patch: Partial<Pick<RoomType, "pricePerNight" | "totalUnits">>,
  ) {
    setSavingId(room.id);
    try {
      const updated = await updateRoomType(room.id, patch);
      setRoomTypes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      toast.success(`${updated.name} updated.`);
    } catch {
      toast.error("Could not save changes.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleAddRule() {
    if (!ruleRoomId || !ruleLabel.trim() || !ruleRange?.from || !ruleRange?.to || !rulePrice) {
      toast.error("Fill in label, dates, and price for the seasonal rule.");
      return;
    }
    setAddingRule(true);
    try {
      const rule = await addSeasonalRule({
        roomTypeId: ruleRoomId,
        label: ruleLabel.trim(),
        startDate: format(ruleRange.from, "yyyy-MM-dd"),
        endDate: format(ruleRange.to, "yyyy-MM-dd"),
        pricePerNight: Number(rulePrice),
      });
      setRules((prev) => [...prev, rule]);
      setRuleLabel("");
      setRuleRange(undefined);
      setRulePrice("");
      toast.success("Seasonal rule added.");
    } catch {
      toast.error("Could not add rule.");
    } finally {
      setAddingRule(false);
    }
  }

  async function handleRemoveRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    try {
      await removeSeasonalRule(id);
      toast.success("Rule removed.");
    } catch {
      toast.error("Could not remove rule. Refresh and try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-stone">
        <Loader2 className="size-5 animate-spin" /> Loading rooms...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl text-ink">Rooms & Pricing</h1>
        <p className="mt-1 text-sm text-stone">
          Base rates, unit counts, and seasonal price overrides.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {roomTypes.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            saving={savingId === room.id}
            onSave={(patch) => handleSave(room, patch)}
          />
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mist">
        <h2 className="font-heading text-lg text-ink">Seasonal pricing</h2>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-44">
            <Label>Cottage</Label>
            <Select value={ruleRoomId} onValueChange={setRuleRoomId}>
              <SelectTrigger className="mt-1.5 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-40">
            <Label>Label</Label>
            <Input
              value={ruleLabel}
              onChange={(e) => setRuleLabel(e.target.value)}
              placeholder="Eid Holidays"
              className="mt-1.5 w-full"
            />
          </div>
          <div className="w-full sm:w-52">
            <Label>Dates</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="mt-1.5 w-full justify-start font-normal">
                  {ruleRange?.from && ruleRange?.to
                    ? `${format(ruleRange.from, "d MMM")} – ${format(ruleRange.to, "d MMM")}`
                    : "Select range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={ruleRange}
                  onSelect={setRuleRange}
                  disabled={{ before: new Date() }}
                  numberOfMonths={isWideScreen ? 2 : 1}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full sm:w-32">
            <Label>Price / night</Label>
            <Input
              type="number"
              value={rulePrice}
              onChange={(e) => setRulePrice(e.target.value)}
              placeholder="18000"
              className="mt-1.5 w-full"
            />
          </div>
          <Button onClick={handleAddRule} disabled={addingRule} className="w-full sm:w-auto">
            {addingRule ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
            Add rule
          </Button>
        </div>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Cottage</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Price / night</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-stone">
                  No seasonal rules yet.
                </TableCell>
              </TableRow>
            )}
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium text-ink">{rule.label}</TableCell>
                <TableCell>
                  {roomTypes.find((r) => r.id === rule.roomTypeId)?.name ?? "—"}
                </TableCell>
                <TableCell className="text-stone">
                  {formatDateLong(rule.startDate)} – {formatDateLong(rule.endDate)}
                </TableCell>
                <TableCell>{formatPKR(rule.pricePerNight)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Remove ${rule.label} rule`}
                    className="size-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveRule(rule.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RoomCard({
  room,
  saving,
  onSave,
}: {
  room: RoomType;
  saving: boolean;
  onSave: (patch: Partial<Pick<RoomType, "pricePerNight" | "totalUnits">>) => void;
}) {
  const [price, setPrice] = React.useState(String(room.pricePerNight));
  const [units, setUnits] = React.useState(String(room.totalUnits));

  const dirty = price !== String(room.pricePerNight) || units !== String(room.totalUnits);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-mist">
      <p className="font-heading text-lg text-ink">{room.name}</p>
      <p className="text-sm text-stone">{room.tagline}</p>

      <div className="mt-4 space-y-3">
        <div>
          <Label>Price / night (PKR)</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>Total units</Label>
          <Input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <Button
          className="w-full"
          disabled={!dirty || saving}
          onClick={() =>
            onSave({ pricePerNight: Number(price), totalUnits: Number(units) })
          }
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          Save changes
        </Button>
      </div>
    </div>
  );
}
