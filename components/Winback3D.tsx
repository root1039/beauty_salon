"use client";

import { useEffect, useRef, useCallback } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (name: string) => `${BASE}/images/menu/winback3d/${name}`;

type Layer = { src: string; zt?: boolean; tag?: string; desc?: string };

const LAYERS: Layer[] = [
  { src: "1-1.jpg", zt: true },
  { src: "1-2.jpg", tag: "SKIN SURFACE", desc: "高周波が最初に触れる肌表面。\nキメと毛穴の世界。" },
  { src: "1-3.jpg", tag: "EPIDERMIS", desc: "角質層を通過し、表皮細胞の間を\nエネルギーが浸透していく。" },
  { src: "1-4.jpg", tag: "DERMIS", desc: "コラーゲン繊維と毛細血管のネットワーク。\n温熱が血行を促進する。" },
  { src: "2-1.jpg", zt: true },
  { src: "2-2.jpg", tag: "ADIPOSE TISSUE", desc: "皮下脂肪層へ到達。\n高周波が脂肪細胞の代謝を活性化。" },
  { src: "2-3.jpg", tag: "FASCIA", desc: "筋膜を温める。\n深層の柔軟性と循環を回復。" },
  { src: "2-4.jpg", tag: "MUSCLE LAYER", desc: "筋組織まで到達した高周波が\n深部から身体を温める。" },
  { src: "3-1.jpg", zt: true },
  { src: "3-2.jpg", tag: "DEEP CONNECTIVE", desc: "腱と深層結合組織。\nRETモードが最も硬い組織へ届く。" },
  { src: "3-3.jpg", tag: "MUSCLE FASCICLE", desc: "筋束の奥深くまで。\n根本からボディラインを整える。" },
  { src: "3-4.jpg", zt: true },
];

const ZONES = [
  { label: "ZONE 1 — 表層", range: [0, 3] },
  { label: "ZONE 2 — 中間層", range: [4, 7] },
  { label: "ZONE 3 — 深部", range: [8, 11] },
] as const;

const N = LAYERS.length;
const ZGAP = 380;
const ZCAM = ZGAP * (N - 0.15);
const MAX_DEPTH = 120;
const LAYER_P = Array.from({ length: N }, (_, i) => (i * ZGAP) / ZCAM);

function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null;
  while (node && node !== document.documentElement) {
    const s = getComputedStyle(node);
    if (s.overflowY === "auto" || s.overflowY === "scroll") return node;
    node = node.parentElement;
  }
  return null;
}

function isContainerScrolling(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight + 50;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Winback3D() {
  const secRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLElement>(null);
  const depthRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLElement | null)[]>([]);
  const zlblRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const currentLayerRef = useRef(0);
  const isSnappingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const animFrameRef = useRef(0);

  const getScrollInfo = useCallback(() => {
    const sec = secRef.current;
    const sp = scrollParentRef.current;
    if (!sec) return null;
    const useContainer = sp && isContainerScrolling(sp);
    const ch = useContainer ? sp.clientHeight : window.innerHeight;
    const total = sec.offsetHeight - ch;
    return { sec, sp, useContainer, ch, total };
  }, []);

  const calcProgress = useCallback(() => {
    const info = getScrollInfo();
    if (!info || info.total <= 0) return 0;
    const { sec, sp, useContainer, total } = info;

    if (useContainer && sp) {
      const secRect = sec.getBoundingClientRect();
      const spRect = sp.getBoundingClientRect();
      const relTop = secRect.top - spRect.top;
      return Math.max(0, Math.min(1, -relTop / total));
    }
    const r = sec.getBoundingClientRect();
    return Math.max(0, Math.min(1, -r.top / total));
  }, [getScrollInfo]);

  const drive = useCallback(() => {
    const sec = secRef.current;
    const world = worldRef.current;
    if (!sec || !world) return;

    const p = calcProgress();
    const cam = p * ZCAM;

    let active = 0, best = 1e9;
    for (let i = 0; i < N; i++) {
      const l = layerRefs.current[i];
      if (!l) continue;
      const eff = -i * ZGAP + cam;
      const dist = Math.abs(eff);
      const z = eff > 0 ? Math.min(eff, 880) : eff;
      l.style.transform = `translateZ(${z.toFixed(1)}px)`;
      l.style.opacity = String(
        eff < 0 ? Math.max(0, 1 + eff / 480) : Math.max(0, 1 - eff / 300)
      );
      l.style.filter = dist > 60 ? `blur(${Math.min(8, (dist - 60) / 70).toFixed(1)}px)` : "none";
      l.style.zIndex = String(600 - Math.round(dist / 5));
      if (dist < best) { best = dist; active = i; }
    }

    currentLayerRef.current = active;

    const zone = active < 4 ? 0 : active < 8 ? 1 : 2;
    zlblRefs.current.forEach((el, i) => {
      if (el) el.style.color = i === zone ? "#f4efe6" : "#7a6b55";
    });
    dotRefs.current.forEach((d) => {
      if (!d) return;
      const di = Number(d.dataset.i);
      const on = di === active;
      d.style.background = on ? "#d4a853" : "rgba(212,168,83,.2)";
      d.style.boxShadow = on ? "0 0 10px rgba(212,168,83,.6)" : "none";
    });

    if (progRef.current) progRef.current.style.height = `${(p * 100).toFixed(1)}%`;
    if (depthRef.current) {
      depthRef.current.textContent = String(Math.round(p * MAX_DEPTH));
      depthRef.current.style.color = zone === 0 ? "#d4a853" : zone === 1 ? "#c4652a" : "#8b2500";
    }
  }, [calcProgress]);

  const animateToLayer = useCallback((targetIdx: number) => {
    const info = getScrollInfo();
    if (!info || info.total <= 0) return;
    const { sp, useContainer, total } = info;

    isSnappingRef.current = true;
    const startP = calcProgress();
    const endP = LAYER_P[targetIdx];
    const deltaScroll = (endP - startP) * total;

    if (Math.abs(deltaScroll) < 2) {
      isSnappingRef.current = false;
      return;
    }

    const scrollEl = (useContainer && sp) ? sp : null;
    const startScroll = scrollEl ? scrollEl.scrollTop : window.scrollY;
    const targetScroll = startScroll + deltaScroll;
    const duration = 500;
    const start = performance.now();

    cancelAnimationFrame(animFrameRef.current);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const val = startScroll + (targetScroll - startScroll) * easeInOutCubic(t);
      if (scrollEl) {
        scrollEl.scrollTop = val;
      } else {
        window.scrollTo(0, val);
      }
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        isSnappingRef.current = false;
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [getScrollInfo, calcProgress]);

  useEffect(() => {
    const pin = pinRef.current;
    const sp = findScrollParent(secRef.current);
    scrollParentRef.current = sp;

    const updatePinHeight = () => {
      if (!pinRef.current) return;
      if (sp && isContainerScrolling(sp)) {
        pinRef.current.style.height = `${sp.clientHeight}px`;
      } else {
        pinRef.current.style.height = "100vh";
      }
    };
    updatePinHeight();

    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => { drive(); tick = false; });
    };

    const handleSnap = (direction: number) => {
      if (isSnappingRef.current) return;
      const p = calcProgress();
      const cur = currentLayerRef.current;

      if (p <= 0.001 && direction < 0) return false;
      if (p >= 0.999 && direction > 0) return false;
      if (p <= 0.001 && direction > 0 && cur === 0) {
        animateToLayer(1);
        return true;
      }

      const next = direction > 0 ? Math.min(cur + 1, N - 1) : Math.max(cur - 1, 0);
      if (next === cur) return false;
      animateToLayer(next);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      const p = calcProgress();
      if (p <= 0.001 && e.deltaY < 0) return;
      if (p >= 0.999 && e.deltaY > 0) return;
      if (p <= 0.001 && e.deltaY > 0) {
        e.preventDefault();
        handleSnap(1);
        return;
      }
      e.preventDefault();
      if (isSnappingRef.current) return;
      handleSnap(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const p = calcProgress();
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (p <= 0.001 && deltaY < -10) return;
      if (p >= 0.999 && deltaY > 10) return;
      if (p > 0.001 && p < 0.999) {
        e.preventDefault();
      } else if (Math.abs(deltaY) > 10) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 30) return;
      handleSnap(deltaY > 0 ? 1 : -1);
    };

    if (pin) {
      pin.addEventListener("wheel", onWheel, { passive: false });
      pin.addEventListener("touchstart", onTouchStart, { passive: true });
      pin.addEventListener("touchmove", onTouchMove, { passive: false });
      pin.addEventListener("touchend", onTouchEnd, { passive: true });
    }
    if (sp) sp.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { updatePinHeight(); onScroll(); });
    onScroll();

    return () => {
      if (pin) {
        pin.removeEventListener("wheel", onWheel);
        pin.removeEventListener("touchstart", onTouchStart);
        pin.removeEventListener("touchmove", onTouchMove);
        pin.removeEventListener("touchend", onTouchEnd);
      }
      if (sp) sp.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [drive, calcProgress, animateToLayer]);

  return (
    <>
      <style>{CSS_TEXT}</style>

      {/* intro */}
      <div className="wb3d-intro">
        <p className="wb3d-intro-tag">DEPTH EXPERIENCE</p>
        <p className="wb3d-intro-title">Winback を体験する</p>
        <p className="wb3d-intro-sub">
          スクロールで、高周波が届く深さを体感してください。
        </p>
        <div className="wb3d-intro-arrow" />
      </div>

      {/* dive */}
      <section className="wb3d-sec" ref={secRef}>
        <div className="wb3d-pin" ref={pinRef}>
          {/* HUD */}
          <div className="wb3d-hud">
            <nav className="wb3d-znav">
              {ZONES.map((z, zi) => (
                <div key={zi} className="wb3d-zgrp">
                  <div
                    className="wb3d-zlbl"
                    ref={(el) => { zlblRefs.current[zi] = el; }}
                  >
                    {z.label}
                  </div>
                  <div className="wb3d-dots">
                    {Array.from({ length: z.range[1] - z.range[0] + 1 }, (_, j) => {
                      const idx = z.range[0] + j;
                      return (
                        <i
                          key={idx}
                          data-i={idx}
                          ref={(el) => { dotRefs.current[idx] = el; }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* world */}
          <div className="wb3d-world" ref={worldRef}>
            {LAYERS.map((layer, i) => (
              <div
                key={i}
                className="wb3d-layer"
                ref={(el) => { layerRefs.current[i] = el; }}
              >
                <div className={`wb3d-panel${layer.zt ? " wb3d-zt" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(layer.src)} alt="" loading="lazy" />
                  {!layer.zt && layer.tag && (
                    <div className="wb3d-ov">
                      <span className="wb3d-ov-tag">{layer.tag}</span>
                      <span className="wb3d-ov-desc">
                        {layer.desc?.split("\n").map((line, li) => (
                          <span key={li}>{line}{li === 0 && <br />}</span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* progress */}
          <div className="wb3d-prog">
            <i ref={progRef} />
          </div>

          {/* depth meter */}
          <div className="wb3d-depth">
            <div className="wb3d-depth-lbl">PENETRATION</div>
            <div className="wb3d-depth-val" ref={depthRef}>0</div>
            <div className="wb3d-depth-unit">mm</div>
          </div>
        </div>
      </section>

      {/* outro */}
      <div className="wb3d-outro">
        <p className="wb3d-outro-title">全ての周波数を、1台で。</p>
        <p className="wb3d-outro-sub">
          WINBACK BACK4 は CET から RET+ まで<br />
          身体のあらゆる層にアプローチします。
        </p>
      </div>
    </>
  );
}

const CSS_TEXT = `
/* ── Winback 3D Depth Dive (embedded) ── */
.wb3d-intro{
  margin:0 -20px;padding:60px 24px 40px;text-align:center;
  background:linear-gradient(180deg,var(--cream,#fbf3df) 0%,#0d0804 100%);
}
.wb3d-intro-tag{
  font-size:10px;letter-spacing:.22em;color:#d4a853;margin-bottom:6px;
  font-family:sans-serif;
}
.wb3d-intro-title{
  font-family:var(--font-shippori),'Noto Sans JP',serif;
  font-weight:300;font-size:clamp(22px,5vw,36px);color:#f4efe6;
  letter-spacing:.06em;margin-bottom:10px;
}
.wb3d-intro-sub{
  font-size:12px;color:#bfaa8a;line-height:1.8;
}
.wb3d-intro-arrow{
  width:16px;height:16px;margin:20px auto 0;
  border-right:1.5px solid #d4a853;border-bottom:1.5px solid #d4a853;
  transform:rotate(45deg);opacity:.5;
  animation:wb3d-bounce 2s ease-in-out infinite;
}
@keyframes wb3d-bounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

.wb3d-sec{position:relative;padding:0;overflow:visible;height:800vh;margin:0 -20px}
.wb3d-pin{
  position:sticky;top:0;height:100vh;overflow:hidden;
  perspective:1000px;-webkit-perspective:1000px;
  perspective-origin:50% 50%;-webkit-perspective-origin:50% 50%;
  background:#060302;
}
.wb3d-world{
  position:absolute;inset:0;
  transform-style:preserve-3d;-webkit-transform-style:preserve-3d;
  will-change:transform;
}
.wb3d-layer{
  position:absolute;left:50%;top:50%;
  width:min(520px,84vw);aspect-ratio:1;
  will-change:transform,opacity,filter;
}
.wb3d-panel{
  transform:translate(-50%,-50%);border-radius:16px;overflow:hidden;
  width:100%;height:100%;position:relative;
  border:1px solid rgba(212,168,83,.16);
  box-shadow:0 40px 90px -24px rgba(0,0,0,.85);
}
.wb3d-panel img{width:100%;height:100%;object-fit:cover;display:block}

.wb3d-ov{
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:flex-end;padding:20px 16px;
  background:linear-gradient(to top,rgba(6,3,2,.72) 0%,rgba(6,3,2,.12) 40%,transparent 60%);
}
.wb3d-ov-tag{
  font-size:9px;letter-spacing:.22em;color:#d4a853;
  text-transform:uppercase;margin-bottom:2px;font-family:sans-serif;
}
.wb3d-ov-desc{
  font-size:12px;color:#bfaa8a;text-align:center;
  max-width:30ch;line-height:1.7;font-weight:300;
}
.wb3d-zt .wb3d-ov{display:none}

/* HUD */
.wb3d-hud{
  position:absolute;left:clamp(12px,4vw,40px);top:50%;
  transform:translateY(-50%);z-index:6;pointer-events:none;
}
.wb3d-znav{display:flex;flex-direction:column;gap:16px}
.wb3d-zgrp{display:flex;flex-direction:column;gap:4px}
.wb3d-zlbl{
  font-family:var(--font-shippori),serif;font-weight:300;
  font-size:clamp(11px,1.5vw,15px);color:#7a6b55;
  transition:.5s cubic-bezier(.16,1,.3,1);letter-spacing:.04em;white-space:nowrap;
}
.wb3d-dots{display:flex;gap:4px;padding-left:2px}
.wb3d-dots i{
  width:5px;height:5px;border-radius:50%;
  background:rgba(212,168,83,.2);transition:.35s cubic-bezier(.16,1,.3,1);
}

/* progress */
.wb3d-prog{
  position:absolute;right:clamp(12px,4vw,36px);top:50%;
  transform:translateY(-50%);width:3px;height:36%;
  background:rgba(212,168,83,.08);border-radius:3px;z-index:6;
}
.wb3d-prog i{
  display:block;width:100%;height:0;border-radius:3px;
  background:linear-gradient(#d4a853,#c4652a,#8b2500);
}

/* depth meter */
.wb3d-depth{
  position:absolute;right:clamp(24px,5vw,50px);bottom:12%;
  z-index:6;text-align:right;pointer-events:none;
}
.wb3d-depth-lbl{font-size:8px;letter-spacing:.18em;color:#7a6b55;margin-bottom:3px;font-family:sans-serif}
.wb3d-depth-val{
  font-family:var(--font-shippori),serif;font-size:clamp(28px,5vw,44px);
  font-weight:300;color:#d4a853;line-height:1;letter-spacing:.02em;
}
.wb3d-depth-unit{font-size:9px;letter-spacing:.12em;color:#7a6b55;margin-top:2px;font-family:sans-serif}

/* outro */
.wb3d-outro{
  margin:0 -20px;padding:60px 24px;text-align:center;
  background:linear-gradient(180deg,#060302 0%,#0d0804 40%,var(--cream,#fbf3df) 100%);
  min-height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
}
.wb3d-outro-title{
  font-family:var(--font-shippori),'Noto Sans JP',serif;
  font-weight:300;font-size:clamp(20px,4vw,32px);color:#f4efe6;
  letter-spacing:.06em;margin-bottom:10px;
}
.wb3d-outro-sub{
  font-size:12px;color:#bfaa8a;line-height:1.9;font-weight:300;
}

@media(prefers-reduced-motion:reduce){
  .wb3d-intro-arrow{animation:none!important}
}
`;
