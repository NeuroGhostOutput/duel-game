import React, { useState, useEffect, useRef, useCallback } from "react";
import Canvas from "./Canvas";
import ColorMenu from "./ColorMenu";
import Slider from "./Slider";
import "../index.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const HERO_RADIUS = 20;
const SPELL_RADIUS = 5;
const SPELL_SPEED = 5;

const Game = () => {
  const hero1Ref = useRef({
    x: 50,
    y: 300,
    direction: 1,
    color: "blue",
    fireRate: 1,
    speed: 5,
    lastFire: 0,
  });
  const hero2Ref = useRef({
    x: 750,
    y: 300,
    direction: 1,
    color: "red",
    fireRate: 1,
    speed: 5,
    lastFire: 0,
  });
  const spells1Ref = useRef([]);
  const spells2Ref = useRef([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [showColorMenu1, setShowColorMenu1] = useState(false);
  const [showColorMenu2, setShowColorMenu2] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);

  const castSpell = useCallback((hero, spells, isHero1) => {
    const now = Date.now();
    if (now - hero.lastFire > 1000 / hero.fireRate) {
      spells.current.push({
        x: hero.x,
        y: hero.y,
        direction: isHero1 ? 1 : -1,
      });
      hero.lastFire = now;
    }
  }, []);

  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hero1 = hero1Ref.current;
    const hero2 = hero2Ref.current;

    // Draw heroes
    ctx.beginPath();
    ctx.arc(hero1.x, hero1.y, HERO_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = hero1.color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(hero2.x, hero2.y, HERO_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = hero2.color;
    ctx.fill();

    // Draw spells
    ctx.fillStyle = hero1.color;
    spells1Ref.current.forEach((spell) => {
      ctx.beginPath();
      ctx.arc(spell.x, spell.y, SPELL_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.fillStyle = hero2.color;
    spells2Ref.current.forEach((spell) => {
      ctx.beginPath();
      ctx.arc(spell.x, spell.y, SPELL_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw score
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`${score1} - ${score2}`, 380, 30);
  }, [score1, score2]);

  const updateGame = useCallback(() => {
    const hero1 = hero1Ref.current;
    const hero2 = hero2Ref.current;
    const mousePos = mousePosRef.current;

    // Update hero1
    hero1.y += hero1.direction * hero1.speed;
    if (hero1.y <= HERO_RADIUS || hero1.y >= CANVAS_HEIGHT - HERO_RADIUS) {
      hero1.direction *= -1;
      hero1.y = Math.max(
        HERO_RADIUS,
        Math.min(CANVAS_HEIGHT - HERO_RADIUS, hero1.y)
      );
    }
    if (
      Math.abs(mousePos.x - hero1.x) < HERO_RADIUS &&
      Math.abs(mousePos.y - hero1.y) < HERO_RADIUS
    ) {
      hero1.direction *= -1;
    }
    castSpell(hero1, spells1Ref, true);

    // Update hero2
    hero2.y += hero2.direction * hero2.speed;
    if (hero2.y <= HERO_RADIUS || hero2.y >= CANVAS_HEIGHT - HERO_RADIUS) {
      hero2.direction *= -1;
      hero2.y = Math.max(
        HERO_RADIUS,
        Math.min(CANVAS_HEIGHT - HERO_RADIUS, hero2.y)
      );
    }
    if (
      Math.abs(mousePos.x - hero2.x) < HERO_RADIUS &&
      Math.abs(mousePos.y - hero2.y) < HERO_RADIUS
    ) {
      hero2.direction *= -1;
    }
    castSpell(hero2, spells2Ref, false);

    // Update spells
    spells1Ref.current = spells1Ref.current.filter((spell) => {
      spell.x += SPELL_SPEED * spell.direction;
      if (spell.x <= 0 || spell.x >= CANVAS_WIDTH) return false;
      if (
        Math.abs(spell.x - hero2.x) < HERO_RADIUS &&
        Math.abs(spell.y - hero2.y) < HERO_RADIUS
      ) {
        setScore1((prev) => prev + 1);
        return false;
      }
      return true;
    });

    spells2Ref.current = spells2Ref.current.filter((spell) => {
      spell.x += SPELL_SPEED * spell.direction;
      if (spell.x <= 0 || spell.x >= CANVAS_WIDTH) return false;
      if (
        Math.abs(spell.x - hero1.x) < HERO_RADIUS &&
        Math.abs(spell.y - hero1.y) < HERO_RADIUS
      ) {
        setScore2((prev) => prev + 1);
        return false;
      }
      return true;
    });

    renderGame();
  }, [castSpell, renderGame]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    gameLoopRef.current = setInterval(updateGame, 1000 / 60); // 60 FPS

    return () => {
      clearInterval(gameLoopRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updateGame]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hero1 = hero1Ref.current;
    const hero2 = hero2Ref.current;

    if (Math.sqrt((x - hero1.x) ** 2 + (y - hero1.y) ** 2) <= HERO_RADIUS) {
      setShowColorMenu1(true);
    } else if (
      Math.sqrt((x - hero2.x) ** 2 + (y - hero2.y) ** 2) <= HERO_RADIUS
    ) {
      setShowColorMenu2(true);
    }
  };

  return (
    <div className="centred-container">
      <div className="grid-container justify-center">
        <div className="Item2">
          <h3>Hero 1</h3>
          <Slider
            label="Fire Rate"
            value={hero1Ref.current.fireRate}
            onChange={(value) => {
              hero1Ref.current.fireRate = value;
            }}
            min={0.5}
            max={5}
            step={0.5}
          />
          <Slider
            label="Speed"
            value={hero1Ref.current.speed}
            onChange={(value) => {
              hero1Ref.current.speed = value;
            }}
            min={1}
            max={10}
          />
        </div>
        <div className="Item3">
          <Canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
          {showColorMenu1 && (
            <ColorMenu
              onClose={() => setShowColorMenu1(false)}
              onColorChange={(color) => {
                hero1Ref.current.color = color;
              }}
            />
          )}
          {showColorMenu2 && (
            <ColorMenu
              onClose={() => setShowColorMenu2(false)}
              onColorChange={(color) => {
                hero2Ref.current.color = color;
              }}
            />
          )}
        </div>
        <div className="Item4">
          <h3>Hero 2</h3>
          <Slider
            label="Fire Rate"
            value={hero2Ref.current.fireRate}
            onChange={(value) => {
              hero2Ref.current.fireRate = value;
            }}
            min={0.5}
            max={5}
            step={0.5}
          />
          <Slider
            label="Speed"
            value={hero2Ref.current.speed}
            onChange={(value) => {
              hero2Ref.current.speed = value;
            }}
            min={1}
            max={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
