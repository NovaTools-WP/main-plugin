// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Globe, 
  Search, 
  Puzzle, 
  CheckCircle2, 
  Settings, 
  Power, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Sparkles,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  const addons = window['novaTools']?.addons || [];
  const activeCount = addons.filter((addon) => addon.status === "active").length;
  const [selectedAddon, setSelectedAddon] = useState(null);

  // Helper to render addon icons with premium styling
  const renderIcon = (iconName, status) => {
    const isActive = status === "active";
    let bgClass = "bg-muted";

    if (iconName === "Globe") {
      bgClass = isActive 
        ? "bg-violet-500/10 text-violet-500 ring-2 ring-violet-500/20" 
        : "bg-slate-500/10 text-slate-400";
    } else if (iconName === "Search") {
      bgClass = isActive 
        ? "bg-sky-500/10 text-sky-500 ring-2 ring-sky-500/20" 
        : "bg-slate-500/10 text-slate-400";
    }

    return (
      <div className={`p-3 rounded-2xl transition-all duration-300 ${bgClass}`}>
        {iconName === "Globe" ? (
          <Globe className="h-6 w-6" />
        ) : iconName === "Search" ? (
          <Search className="h-6 w-6" />
        ) : (
          <Puzzle className="h-6 w-6" />
        )}
      </div>
    );
  };

  // Helper to render badge status
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/30 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="default" className="bg-amber-500/15 text-amber-500 hover:bg-amber-500/20 border border-amber-500/30 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Inactive
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="bg-slate-500/15 text-slate-500 hover:bg-slate-500/20 border border-slate-500/30 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-slate-400"></span>
            Not Installed
          </Badge>
        );
    }
  };

  const handleAction = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Sleek Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
              <Sparkles className="h-3 w-3" />
              <span>NovaTools Core Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              NovaTools Dashboard
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed font-normal">
              Power up your site with official NovaTools add-ons. Activate, configure, and monitor all features from one centralized panel.
            </p>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 min-w-[240px]">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Addons Active</span>
              <span className="text-3xl font-black text-white">{activeCount} <span className="text-lg text-slate-500">/ {addons.length}</span></span>
            </div>
            <div className="space-y-1 border-l border-slate-800 pl-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Core version</span>
              <span className="text-3xl font-black text-indigo-400">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Addons Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Puzzle className="h-5 w-5 text-indigo-500" />
              Available Add-ons
            </h2>
            <p className="text-muted-foreground text-sm">
              Enhance performance, search ranking, and language translation settings.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {addons.length === 0 ? (
            <Card className="col-span-full border-dashed p-12 text-center space-y-4">
              <Puzzle className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <div className="space-y-1">
                <p className="font-semibold text-lg">No addons found</p>
                <p className="text-sm text-muted-foreground">Please check if any NovaTools addon plugins are installed.</p>
              </div>
            </Card>
          ) : (
            addons.map((addon) => {
              const isActive = addon.status === "active";

              return (
                <Card 
                  key={addon.id} 
                  className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border hover:shadow-xl ${
                    isActive 
                      ? "border-indigo-500/20 bg-indigo-500/[0.01] hover:border-indigo-500/40" 
                      : "border-border hover:border-slate-400/30"
                  }`}
                >
                  {/* Subtle top color bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                    addon.icon === "Globe" 
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500" 
                      : "bg-gradient-to-r from-sky-500 to-blue-500"
                  }`} />

                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="space-y-1.5 pr-4">
                      <div className="flex items-center gap-3">
                        {renderIcon(addon.icon, addon.status)}
                        <div>
                          <CardTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 group-hover:text-indigo-500 transition-colors">
                            {addon.name}
                          </CardTitle>
                          <span className="text-xs text-muted-foreground font-medium">Version {addon.version}</span>
                        </div>
                      </div>
                    </div>
                    {renderStatusBadge(addon.status)}
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[60px]">
                      {addon.description}
                    </p>

                    {/* Features list preview */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Capabilities</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {addon.features?.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {addon.features?.length > 3 && (
                          <li className="text-xs text-indigo-500 font-semibold pl-6 cursor-pointer hover:underline">
                            + {addon.features.length - 3} more capabilities
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center gap-3 pt-4 border-t bg-muted/20">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full flex items-center gap-1.5 hover:bg-slate-100 hover:text-indigo-600 transition-colors font-medium border-slate-200"
                          onClick={() => setSelectedAddon(addon)}
                        >
                          <Info className="h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl sm:rounded-2xl overflow-hidden border border-slate-200">
                        {selectedAddon && (
                          <>
                            <DialogHeader className="pb-4 border-b">
                              <div className="flex items-center gap-4">
                                {renderIcon(selectedAddon.icon, selectedAddon.status)}
                                <div className="space-y-1">
                                  <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    {selectedAddon.name}
                                  </DialogTitle>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground font-semibold">Version {selectedAddon.version}</span>
                                    {renderStatusBadge(selectedAddon.status)}
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            
                            <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                              <div className="space-y-2">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">About this Addon</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                  {selectedAddon.description}
                                </p>
                              </div>

                              <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Key Capabilities</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectedAddon.features?.map((feat, i) => (
                                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-xs">
                                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                      <span className="font-medium text-slate-700 dark:text-slate-300">{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Performance statistics / System Compatibility metadata */}
                              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Performance Impact</span>
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                                    <Zap className="h-3.5 w-3.5 text-amber-500" /> Ultra-Low / Optimized
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Compatibility</span>
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Fully Compatible
                                  </span>
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="pt-4 border-t flex flex-col sm:flex-row gap-2">
                              <DialogClose asChild>
                                <Button variant="outline" size="sm" className="w-full sm:w-auto">Close</Button>
                              </DialogClose>
                              
                              {selectedAddon.status === "active" && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full sm:w-auto text-destructive border-destructive/20 hover:bg-destructive/5"
                                    onClick={() => handleAction(selectedAddon.deactivateUrl)}
                                  >
                                    Deactivate
                                  </Button>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
                                    onClick={() => {
                                      window.location.hash = selectedAddon.settingsPath;
                                    }}
                                  >
                                    <Settings className="h-4 w-4" />
                                    Configure Settings
                                  </Button>
                                </>
                              )}

                              {selectedAddon.status === "inactive" && (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                                  onClick={() => handleAction(selectedAddon.activateUrl)}
                                >
                                  Activate Addon
                                </Button>
                              )}

                              {selectedAddon.status === "not_installed" && (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
                                  onClick={() => handleAction(selectedAddon.installUrl)}
                                >
                                  Install Addon
                                </Button>
                              )}
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>

                    {isActive && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 hover:shadow-md text-white transition-all font-semibold flex items-center gap-1.5"
                        onClick={() => {
                          window.location.hash = addon.settingsPath;
                        }}
                      >
                        <Settings className="h-4 w-4" />
                        Configure
                      </Button>
                    )}

                    {addon.status === "inactive" && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center gap-1.5"
                        onClick={() => handleAction(addon.activateUrl)}
                      >
                        <Power className="h-4 w-4" />
                        Activate
                      </Button>
                    )}

                    {addon.status === "not_installed" && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full font-semibold flex items-center gap-1.5"
                        onClick={() => handleAction(addon.installUrl)}
                      >
                        Get Addon
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
