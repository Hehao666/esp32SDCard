var CZombies = function(b, a) {
        return (a = function() {}).prototype = {
            name: "Zombies",
            HP: 270,
            Lvl: 1,
            NormalGif: 2,
            CardGif: 0,
            StaticGif: 1,
            BookHandBack: 0,
            AudioArr: [],
            CanSelect: 1,
            CanDisplay: 1,
            BookHandPosition: "50% 70%",
            AttackGif: 3,
            LostHeadGif: 4,
            LostHeadAttackGif: 5,
            HeadGif: 6,
            DieGif: 7,
            BoomDieGif: 8,
            width: 166,
            height: 144,
            beAttackedPointL: 82,
            beAttackedPointR: 156,
            BreakPoint: 90,
            SunNum: 50,
            coolTime: 0,
            Ornaments: 0,
            OrnHP: 0,
            OSpeed: 1.6,
            Speed: 1.6,
            CSS_fliph: "",
            CSS_alpha: "",
            AKind: 0,
            beAttacked: 1,
            isAttacking: 0,
            Attack: 100,
            WalkDirection: 0,
            LivingArea: 1,
            Altitude: 1,
            FreeSetbodyTime: 0,
            FreeFreezeTime: 0,
            FreeSlowTime: 0,
            AudioArr: ["zombie_falling_1"],
            CanPass: function(d, c) {
                return c && c != 2
            },
            CanGrow: function(d, c, e) {
                return this.CanPass(c, oGd.$LF[c]) && e > oS.ArP.ArC[1]
            },
            ChkActs: function(h, f, j, e) {
                var d, c, g;
                !(h.FreeFreezeTime || h.FreeSetbodyTime) ? (h.beAttacked && !h.isAttacking && h.JudgeAttack(), !h.isAttacking ? (c = h.AttackedRX -= d = h.Speed) < -50 ? (j.splice(e, 1), h.DisappearDie(), g = 0) : (c < 100 && !h.PointZombie && (h.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), h.ChangeR({
                    R: f,
                    ar: [oS.R - 1],
                    CustomTop: 400 - h.height + h.GetDY()
                })), h.ZX = h.AttackedLX -= d, h.Ele.style.left = Math.floor(h.X -= d) + "px", g = 1) : g = 1) : g = 1;
                return g
            },
            ChkActs1: function(g, e, h, d) {
                var c, f;
                !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), !g.isAttacking ? (g.AttackedLX += c = g.Speed) > oS.W ? (h.splice(d, 1), g.DisappearDie(), f = 0) : (g.ZX = g.AttackedRX += c, g.Ele.style.left = Math.ceil(g.X += c) + "px", f = 1) : f = 1) : f = 1;
                return f
            },
            GetDX: function() {
                return -110
            },
            GetDY: function() {
                return -10
            },
            GetDTop: 0,
            ChangeR: function(e) {
                var h = e.R,
                    g = e.ar || [],
                    j = e.CustomTop,
                    d = this,
                    q = h - 1,
                    l, k = d.id,
                    m = -1,
                    f = d.Ele,
                    n = d.EleBody,
                    i = oGd.$LF,
                    c;
                !g.length && (d.CanPass(q, i[q]) && (g[++m] = q), d.CanPass(q += 2, i[q]) && (g[++m] = q));
                g.length ? (l = !d.WalkDirection ? -5 : 5, d.ZX += l, d.AttackedLX += l, d.AttackedRX += l, d.X += l, q = g[Math.floor(Math.random() * g.length)], SetStyle(f, {
                    left: d.X + "px",
                    top: (d.pixelTop = j == undefined ? GetY(q) - d.height + d.GetDY() : j) + "px",
                    zIndex: d.zIndex = 3 * q + 1
                }), d.isAttacking && (n.src = d.PicArr[d.NormalGif]), oZ.moveTo(k, h, q)) : n.src = d.PicArr[d.NormalGif];
                d.isAttacking = 0
            },
            getShadow: function(c) {
                return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px"
            },
            Init: function(g, i, e, d) {
                var c = 0,
                    h = this,
                    f = [];
                i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;
                while (--d) {
                    i.CanPass(d, e[d]) && (f[c++] = d)
                }
                i.ArR = f;
                i.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="', '"></div>']
            },
            getHTML: function(d, g, i, h, f, k, j, c) {
                var e = this.ArHTML;
                return e[0] + d + e[1] + f + e[2] + g + e[3] + i + e[4] + h + e[5] + k + e[6] + j + e[7] + c + e[8]
            },
            prepareBirth: function(f) {
                var h = this,
                    e = h.ArR,
                    d = e[Math.floor(Math.random() * e.length)],
                    g = GetY(d) + h.GetDY(),
                    c = g - h.height,
                    j = 3 * d + 1,
                    i = h.id = "Z_" + Math.random();
                h.R = d;
                h.pixelTop = c;
                h.zIndex = j;
                (h.delayT = f) && (h.FreeSetbodyTime = oSym.Now);
                return h.getHTML(i, h.X, c, j, "none", "auto", h.GetDTop, h.PicArr[h.NormalGif])
            },
            CustomBirth: function(i, c, d, m) {
                var g = this,
                    f = GetY(i) + g.GetDY(),
                    h = f - g.height,
                    k = 3 * i + 1,
                    e = g.id = "Z_" + Math.random(),
                    l = g.beAttackedPointL,
                    j = g.beAttackedPointR;
                g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (j - l) * .5) - l) + j;
                g.R = i;
                g.pixelTop = h;
                g.zIndex = k;
                (g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
                return g.getHTML(e, g.X, h, k, "none", m || 0, g.GetDTop, g.PicArr[g.NormalGif])
            },
            BirthCallBack: function(f) {
                var e = f.delayT,
                    d = f.id,
                    c = f.Ele = $(d);
                f.EleShadow = c.firstChild;
                f.EleBody = c.childNodes[1];
                e ? oSym.addTask(e, function(h, g) {
                    var i = $Z[h];
                    i && (i.FreeSetbodyTime = 0, SetBlock(g))
                }, [d, c]) : SetBlock(c)
            },
            Birth: function() {
                var c = this;
                $Z[c.id] = c;
                oZ.add(c);
                c.BirthCallBack(c)
            },
            getCrushed: function(c) {
                return true
            },
            getRaven: function() {
                return this.DisappearDie(), 1
            },
            getExplosion: function() {
                this.ExplosionDie()
            },
            getThump: function() {
                this.DisappearDie()
            },
            PlayNormalballAudio: function() {
                PlayAudio("splat" + Math.floor(1 + Math.random() * 3))
            },
            PlayFireballAudio: function() {
                PlayAudio(["ignite", "ignite2"][Math.floor(Math.random() * 2)])
            },
            PlaySlowballAudio: function() {
                PlayAudio("frozen")
            },
            getFireball: function(h, e, g) {
                h.FreeSlowTime = 0;
                h.Attack = 100;
                h.FreeFreezeTime || h.FreeSetbodyTime ? (h.PlayNormalballAudio(), h.Speed = h.OSpeed) : h.PlayFireballAudio();
                var f = h.AttackedLX,
                    j = h.AttackedRX,
                    c = !g ? oZ.getArZ(f, f + 40, h.R) : oZ.getArZ(j - 40, j, h.R),
                    d = c.length;
                while (d--) {
                    c[d].getSputtering()
                }
            },
            getSputtering: function(c) {
                this.getHit2(this, c || 13, 0)
            },
            getSlow: function(h, f, g) {
                var d = oSym.Now + g,
                    e = h.FreeSlowTime,
                    c = 0;
                switch (true) {
                    case !e:
                        !(h.FreeFreezeTime || h.FreeSetbodyTime) && (h.Speed = .5 * h.OSpeed);
                        h.Attack = 50;
                        h.PlaySlowballAudio();
                        h.FreeSlowTime = d;
                        c = 1;
                        break;
                    case e < d:
                        h.FreeSlowTime = d;
                        h.PlayNormalballAudio();
                        c = 1
                }
                c && oSym.addTask(g, function(j, i) {
                    var k = $Z[j];
                    k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, k.Speed && (k.Speed = k.OSpeed))
                }, [f, d])
            },
            getFreeze: function(d, c) {
                d.beAttacked && d.getHit0(d, 20, 0);
                d.Speed = 0;
                oSym.addTask(400, function(g, f, e) {
                    ClearChild(e);
                    var h = $Z[g];
                    h && h.FreeFreezeTime == f && (h.FreeFreezeTime = 0, h.Attack = 50, !h.FreeSetbodyTime && (h.Speed = .5 * h.OSpeed, h.isAttacking && h.JudgeAttack()), oSym.addTask(1500, function(j, i) {
                        var k = $Z[j];
                        k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, !k.FreeSetbodyTime && (k.Speed = k.OSpeed))
                    }, [g, h.FreeSlowTime = oSym.Now + 1500]))
                }, [c, d.FreeFreezeTime = oSym.Now + 400, NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", d.getShadow(d), d.Ele)])
            },
            NormalDie: function() {
                var c = this;
                PlayAudio("zombie_falling_1");
                c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
                oSym.addTask(250, ClearChild, [c.Ele]);
                c.HP = 0;
                delete $Z[c.id];
                c.PZ && oP.MonPrgs()
            },
            ExplosionDie: function() {
                var c = this;
                c.EleBody.src = c.PicArr[c.BoomDieGif] + Math.random();
                oSym.addTask(300, ClearChild, [c.Ele]);
                c.HP = 0;
                delete $Z[c.id];
                c.PZ && oP.MonPrgs()
            },
            DisappearDie: function() {
                ClearChild(this.Ele);
                this.HP = 0;
                delete $Z[this.id];
                this.PZ && oP.MonPrgs()
            },
            CrushDie: function() {
                var c = this;
                c.GoingDieHead(c.id, c.PicArr, c);
                ClearChild(c.Ele);
                c.HP = 0;
                delete $Z[c.id];
                c.PZ && oP.MonPrgs()
            },
            GoingDieHead: function(e, c, d) {
                oSym.addTask(200, ClearChild, [NewImg(0, c[d.HeadGif] + Math.random(), "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDPZ)])
            },
            GoingDie: function(d) {
                var c = this,
                    e = c.id;
                c.EleBody.src = d;
                c.GoingDieHead(e, c.PicArr, c);
                c.beAttacked = 0;
                c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = 0;
                c.AutoReduceHP(e)
            },
            AutoReduceHP: function(c) {
                oSym.addTask(100, function(e) {
                    var d = $Z[e];
                    d && ((d.HP -= 60) < 1 ? d.NormalDie() : d.AutoReduceHP(e))
                }, [c])
            },
            JudgeAttack: function() {
                var g = this,
                    d = g.ZX,
                    e = g.R + "_",
                    f = GetC(d),
                    h = oGd.$,
                    c;
                (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0, g.EleBody.src = g.PicArr[g.NormalGif])
            },
            JudgeLR: function(f, d, e, c, g) {
                return e > 10 || e < 1 ? false : function() {
                    d += --e + "_";
                    var h = 3,
                        i;
                    while (h--) {
                        if ((i = g[d + h]) && i.canEat) {
                            return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false
                        }
                    }
                }()
            },
            JudgeSR: function(f, d, e, c, g) {
                return e > 9 ? false : function() {
                    d += e + "_";
                    var h = 3,
                        i;
                    while (h--) {
                        if ((i = g[d + h]) && i.canEat) {
                            return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false
                        }
                    }
                }()
            },
            JudgeAttackH1: function() {
                var e = this,
                    d = oZ.getZ0(e.ZX, e.R),
                    c = e.id;
                d && d.beAttacked && d.AttackedLX < 900 && d.Altitude == 1 && (e.AttackZombie(d.id), !d.isAttacking && d.AttackZombie(c))
            },
            JudgeAttackH: function() {
                var e = this,
                    d = oZ.getZ0(e.ZX, e.R),
                    f = e.id,
                    c;
                d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1) : e.isAttacking && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif])
            },
            AttackZombie: function(d, c) {
                oSym.addTask(10, function(f, e) {
                    var h = $Z[f],
                        g;
                    h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $Z[e]) && g.getHit0(g, 10, 0), h.JudgeAttackH())
                }, [d, c])
            },
            AttackZombie2: function(e, d, c) {
                e.isAttacking = 1;
                e.EleBody.src = e.PicArr[e.AttackGif];
                oSym.addTask(10, function(g, f) {
                    var i = $Z[g],
                        h;
                    i && i.beAttacked && !i.FreeFreezeTime && !i.FreeSetbodyTime && ((h = $Z[f]) ? (h.getHit0(h, 10, 0), oSym.addTask(10, arguments.callee, [g, f])) : (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif]))
                }, [d, c])
            },
            NormalAttack: function(d, c) {
                PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
                oSym.addTask(50, function(e) {
                    $Z[e] && PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)])
                }, [d]);
                oSym.addTask(100, function(f, e) {
                    var h = $Z[f],
                        g;
                    h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack())
                }, [d, c])
            },
            PZ: 1,
            ExchangeLR: function(f, d) {
                var e = f.width,
                    h = f.beAttackedPointL,
                    c = f.beAttackedPointR,
                    g = f.Ele;
                g.style.left = (f.X = f.AttackedLX - (f.beAttackedPointL = e - c)) + "px";
                f.beAttackedPointR = e - h;
                f.EleShadow.style.cssText = f.getShadow(f);
                f.ExchangeLR2(f, f.EleBody, d)
            },
            ExchangeLR2: $User.Browser.IE ? function(e, c, d) {
                c.style.filter = e.CSS_alpha + (e.CSS_fliph = d ? " fliph" : "")
            } : function(e, c, d) {
                c.className = d ? "fliph" : ""
            },
            bedevil: function(c) {
                c.ExchangeLR(c, 1);
                c.JudgeAttack = c.JudgeAttackH;
                c.PZ = 0;
                c.WalkDirection = 1;
                c.ZX = c.AttackedRX;
                c.ChkActs = c.ChkActs1;
                oP.MonPrgs()
            },
            SetAlpha: $User.Browser.IE ? function(f, d, e, c) {
                d.style.filter = (f.CSS_alpha = "alpha(opacity=" + e + ")") + f.CSS_fliph
            } : function(f, d, e, c) {
                d.style.opacity = c
            }
        }, a
    }(),
    OrnNoneZombies = function() {
        var a = function(c, b) {
            if ((c.HP -= b) < c.BreakPoint) {
                c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]);
                c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {};
                return
            }
            c.SetAlpha(c, c.EleBody, 50, .5);
            oSym.addTask(10, function(e, d) {
                (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
            }, [c.id])
        };
        return InheritO(CZombies, {
            getHit: a,
            getHit0: a,
            getHit1: a,
            getHit2: a,
            getHit3: a,
            getPea: function(e, b, c) {
                e.PlayNormalballAudio();
                e.getHit0(e, b, c)
            },
            getFirePea: function(g, c, j) {
                g.PlayFireballAudio();
                (g.FreeSlowTime || g.FreeFreezeTime) && (g.Speed = g.OSpeed, g.FreeSlowTime = 0, g.FreeFreezeTime = 0);
                g.Attack = 100;
                var f = g.AttackedLX,
                    h = g.AttackedRX,
                    b = oZ.getArZ(f, f + 40, g.R),
                    e = b.length;
                while (e--) {
                    b[e].getFirePeaSputtering()
                }
                g.getHit0(g, c, j)
            },
            getFirePeaSputtering: function() {
                this.getHit0(this, 13)
            },
            getSnowPea: function(f, c, g) {
                var e = f.FreeSlowTime,
                    b = oSym.Now + 1e3;
                e == 0 ? (f.PlaySlowballAudio(), f.Speed = .5 * f.OSpeed, f.Attack = 50) : f.PlayNormalballAudio();
                e < b && (f.FreeSlowTime = b, oSym.addTask(1e3, function(h, d) {
                    var i = $Z[h];
                    i && i.FreeSlowTime == d && (i.FreeSlowTime = 0, i.Attack = 100, i.Speed && (i.Speed = i.OSpeed))
                }, [f.id, b]));
                f.getHit0(f, c, g)
            }
        })
    }(),
    oBackupDancer = InheritO(OrnNoneZombies, {
        EName: "oBackupDancer",
        CName: "伴舞僵尸",
        OSpeed: 3.5,
        Speed: 3.5,
        Lvl: 1,
        StandGif: 9,
        CanSelect: 0,
        beAttackedPointL: 40,
        beAttackedPointR: 85,
        width: 184,
        height: 176,
        Speed: 3.5,
        OSpeed: 3.5,
        getShadow: function(a) {
            return "display:none"
        },
        PicArr: function() {
            var a = "images/Zombies/BackupDancer/";
            return ["images/Card/Zombies/BackupDancer.png", a + "0.gif", a + "BackupDancer.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "Dancing.gif" + $Random, a + "LostHeadDancing.gif" + $Random, a + "Mound.gif" + $Random]
        }(),
        GetDY: function() {
            return 0
        },
        bedevil: function(a) {
            a.ExchangeLR(a, 1);
            a.JudgeAttack = a.JudgeAttackH;
            a.PZ = 0;
            a.WalkDirection = 1;
            a.ZX = a.AttackedRX;
            a.ChkActs = a.ChkActs1;
            a.Speed = 3.5;
            a.ChangeChkActsTo1(a, a.id, a.EleBody);
            oP.MonPrgs()
        },
        getSlow: function(f, d, e) {
            var b = oSym.Now + e,
                c = f.FreeSlowTime,
                a = 0;
            switch (true) {
                case !c:
                    f.PlaySlowballAudio();
                    f.Attack = 50;
                    f.FreeSlowTime = b;
                    a = 1;
                    break;
                case c < b:
                    f.PlayNormalballAudio();
                    f.FreeSlowTime = b;
                    a = 1
            }
            a && oSym.addTask(e, function(h, g) {
                var i = $Z[h];
                i && i.FreeSlowTime == g && (i.FreeSlowTime = 0, i.Attack = 100)
            }, [d, b])
        },
        getFreeze: function(b, a) {
            b.beAttacked && b.getHit0(b, 20, 0);
            oSym.addTask(400, function(e, d, c) {
                ClearChild(c);
                var f = $Z[e];
                f && f.FreeFreezeTime == d && (f.FreeFreezeTime = 0, f.Attack = 50, !f.FreeSetbodyTime && f.isAttacking && f.JudgeAttack(), oSym.addTask(1500, function(h, g) {
                    var i = $Z[h];
                    i && i.FreeSlowTime == g && (i.FreeSlowTime = 0, i.Attack = 100)
                }, [e, f.FreeSlowTime = oSym.Now + 1500]))
            }, [a, b.FreeFreezeTime = oSym.Now + 400, NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", b.getShadow(b), b.Ele)])
        },
        CustomBirth: function(g, d, a, b, j) {
            var e = this,
                c = GetY(g) + e.GetDY(),
                f = c - e.height,
                i = e.beAttackedPointL,
                h = e.beAttackedPointR;
            e.AttackedRX = (e.X = (e.ZX = e.AttackedLX = d - (h - i) * .5) - i) + h;
            e.R = g;
            (e.delayT = a) && (e.FreeSetbodyTime = oSym.Now);
            return e.getHTML(e.id = b, e.X, e.pixelTop = f, e.zIndex = 3 * g + 1, "none", j || 0, e.height + "px", e.PicArr[e.StandGif])
        },
        Produce: '当舞者僵尸摇摆时，这种僵尸四个结伙出现。</p><p>韧性：<font color="#FF0000">低</font><br>伴舞僵尸曾在位于僵尸纽约城的“咀利牙”表演艺术学院钻研过六年的舞技。',
        BirthCallBack: function(e) {
            var d = e.delayT,
                c = e.id,
                b = e.Ele = $(c),
                a = e.EleBody = b.childNodes[1];
            e.EleShadow = b.firstChild;
            oSym.addTask(d, function(g, f) {
                var h = $Z[g];
                h && (h.FreeSetbodyTime = 0, SetBlock(f))
            }, [c, b])
        },
        ChangeChkActsTo0: function(c, b, a) {
            if (!c.PZ) {
                c.ChangeChkActsTo1(c, b, a);
                return
            }
            c.LostHeadGif = 10;
            c.NormalGif = 9;
            !c.isAttacking && (a.src = c.PicArr[9]);
            c.Speed = c.DZStep = 0;
            oSym.addTask(200, function(e, d) {
                var f = $Z[e];
                f && f.beAttacked && f.ChangeChkActsTo1(f, e, d)
            }, [b, a])
        },
        ChangeChkActsTo1: function(c, b, a) {
            c.LostHeadGif = 4;
            c.NormalGif = 2;
            c.DZStep = 1;
            !c.isAttacking && (a.src = c.PicArr[2]);
            c.PZ && oSym.addTask(220, function(e, d) {
                var f = $Z[e];
                f && f.beAttacked && f.ChangeChkActsTo0(f, e, d)
            }, [b, a])
        },
        ChkActs: function(g, d, h, c) {
            var e, b, a, f;
            !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
                R: d,
                ar: [oS.R - 1],
                CustomTop: 400 - g.height + g.GetDY()
            })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
            g.ChkSpeed(g);
            return f
        },
        ChkSpeed: function(b) {
            if (!b.DZStep) {
                return
            }
            var a = b.Speed;
            switch (true) {
                case (b.FreeFreezeTime || b.FreeSetbodyTime) == 1:
                    a && (b.Speed = 0);
                    break;
                case b.FreeSlowTime > 0:
                    a != 1.75 && (b.Speed = 1.75);
                    break;
                default:
                    a != 3.5 && (b.Speed = 3.5)
            }
        }
    }),
    oDancingZombie = InheritO(OrnNoneZombies, {
        EName: "oDancingZombie",
        CName: "舞者僵尸",
        HP: 270,
        BreakPoint: 166,
        Lvl: 3,
        StandGif: 9,
        SunNum: 350,
        beAttackedPointL: 40,
        beAttackedPointR: 85,
        width: 184,
        height: 176,
        BookHandPosition: "70% 70%",
        AudioArr: ["dancer"],
        OSpeed: 7.2,
        Speed: 7.2,
        NormalGif: 9,
        GetDTop: 5,
        getShadow: function(a) {
            return "left:30px;top:146px"
        },
        GetDX: function() {
            return -50
        },
        GetDY: function() {
            return -5
        },
        LostHeadGif: 14,
        addSpotlight: function() {
            var a, b;
            $User.Browser.IE6 ? (a = "_8", b = "filter:alpha(opacity=30)") : a = b = "";
            return function(d, f, c) {
                var g = $Z[d],
                    e;
                NewEle(d + "_spotlightCon", "div", "position:absolute;left:-30px;top:-400px;width:184px;height:600px;overflow:hidden", 0, c).appendChild(g.spotlight = NewImg(d + "_spotlight", "images/Zombies/DancingZombie/spotlight" + a + ".png", "left:0;top:0;width:920px;height:600px;" + b));
                e = NewEle(d + "_spotlight2Con", "div", "position:absolute;left:-25px;top:135px;width:184px;height:60px;overflow:hidden", 0);
                c.insertBefore(e, f.EleShadow);
                e.appendChild(g.spotlight2 = NewImg(d + "_spotlight2", "images/Zombies/DancingZombie/spotlight2" + a + ".png", "left:0;top:0;width:920px;height:60px;" + b))
            }
        }(),
        PicArr: function() {
            var d = "images/Zombies/DancingZombie/",
                c = $User.Browser.IE6 ? "_8" : "",
                a = d + "spotlight" + c + ".png" + $Random,
                b = d + "spotlight2" + c + ".png" + $Random;
            return ["images/Card/Zombies/DancingZombie.png", d + "0.gif", d + "DancingZombie.gif", d + "Attack.gif", d + "LostHead.gif", d + "LostHeadAttack.gif", d + "Head.gif" + $Random, d + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, d + "SlidingStep.gif" + $Random, d + "Dancing.gif" + $Random, d + "Summon1.gif", d + "Summon2.gif", d + "Summon3.gif", d + "LostHeadSlidingStep.gif" + $Random, d + "LostHeadDancing.gif" + $Random, d + "LostHeadSummon.gif" + $Random, a, b]
        }(),
        Produce: '舞者僵尸和人类(在世或者死去的)如有雷同，纯属巧合。</p><p>韧性：<font color="#FF0000">中</font><br>特点：<font color="#FF0000">召唤伴舞僵尸</font></p>舞者僵尸的最新唱片“抓住脑子啃啊啃”在僵尸界的人气正急速飙升。',
        getSnowPea: function() {
            Z.PlaySlowballAudio()
        },
        NormalDie: function() {
            var a = this;
            a.ResetBackupDancer(a);
            a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
            oSym.addTask(250, ClearChild, [a.Ele]);
            a.HP = 0;
            delete $Z[a.id];
            a.PZ && oP.MonPrgs()
        },
        ExplosionDie: function() {
            var a = this;
            a.ResetBackupDancer(a);
            a.EleBody.src = a.PicArr[a.BoomDieGif] + Math.random();
            oSym.addTask(300, ClearChild, [a.Ele]);
            a.HP = 0;
            delete $Z[a.id];
            a.PZ && oP.MonPrgs()
        },
        DisappearDie: function() {
            this.ResetBackupDancer(this);
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        CrushDie: function() {
            var a = this;
            a.ResetBackupDancer(a);
            a.GoingDieHead(a.id, a.PicArr, a);
            ClearChild(a.Ele);
            a.HP = 0;
            delete $Z[a.id];
            a.PZ && oP.MonPrgs()
        },
        bedevil: function(b) {
            var a = b.id;
            b.ExchangeLR(b, 1);
            b.JudgeAttack = b.JudgeAttackH;
            b.PZ = 0;
            b.WalkDirection = 1;
            b.ZX = b.AttackedRX;
            b.ChkActs = b.ChkActs1;
            b.ChangeChkActsTo1(b, a, b.EleBody);
            b.ResetBackupDancer(b);
            $(a + "_spotlightCon").style.left = "20px", $(a + "_spotlight2Con").style.left = "25px";
            oP.MonPrgs()
        },
        ResetBackupDancer: function(f) {
            var g = f.ArDZ,
                d = g.length,
                c, b, e, a = f.DZStep;
            while (d--) {
                if ((c = g[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
                    if (a > 0) {
                        switch (true) {
                            case (e.FreeFreezeTime || e.FreeSetbodyTime) == 1:
                                e.Speed = 0;
                                break;
                            case e.FreeSlowTime > 0:
                                e.Speed = 1.75;
                                break;
                            default:
                                e.Speed = 3.5
                        }
                    }
                }
            }
            a > -1 && oSym.addTask(f.DZStepT - oSym.Now, function(o, j) {
                var m = 4,
                    l, k, n, h = "ChangeChkActsTo" + j;
                while (m--) {
                    (l = o[m]) && (k = l[0]) && (n = $Z[k]) && n.beAttacked && (n.DZStep = j, n[h](n, k, n.EleBody))
                }
            }, [g, [1, 0][a]])
        },
        BirthCallBack: function(d) {
            var b = d.delayT,
                l = d.id,
                a = d.Ele = $(l),
                c = 320,
                i = oGd.$LF,
                g = d.R,
                s = g - 1,
                n = g + 1,
                e, r, q = LX - 60,
                m = LX + 100,
                k = LX - 130,
                j = LX - 70,
                h = LX + 30,
                f = d.ArDZ = [0, 0, 0, 0];
            d.EleShadow = a.firstChild;
            d.EleBody = a.childNodes[1];
            s > 0 && (e = i[s]) && e != 2 && (f[0] = ["", s, function(o) {
                return o
            }, 3 * s + 2, function(o) {
                return o - 70
            }, GetY(s) - 155]);
            n <= oS.R && (e = i[n]) && e != 2 && (f[2] = ["", n, function(o) {
                return o
            }, 3 * n + 2, function(o) {
                return o - 70
            }, GetY(n) - 155]);
            e = 3 * g + 2;
            r = GetY(g) - 155;
            f[3] = ["", g, function(o) {
                return o - 60
            }, e, function(o) {
                return o - 130
            }, r];
            f[1] = ["", g, function(o) {
                return o + 100
            }, e, function(o) {
                return o + 30
            }, r];
            func = function(t, o) {
                var u = $Z[t];
                u && (u.ExchangeLR(d, 1), u.DZMSpeed = 7.2, u.DZStep = -1, u.DZStepT = oSym.Now + 220, u.FreeSetbodyTime = 0, SetBlock(o))
            };
            b ? (oSym.addTask(b, func, [l, a]), c += b) : func(l, a);
            oSym.addTask(c, function(o) {
                var t = $Z[o];
                t && t.beAttacked && !t.isAttacking && t.NormalAttack(o)
            }, [d.id])
        },
        ChkActs1: function(e, b, f, a) {
            var c, d;
            !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), c = e.id, !e.isAttacking ? (e.AttackedLX += 3.5) > oS.W ? (f.splice(a, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += 3.5, e.Ele.style.left = Math.ceil(e.X += 3.5) + "px", d = 1) : d = 1) : d = 1;
            return d
        },
        ChkTmp: function(c, b, d, a) {
            c.ChkSpeed(c);
            return 0
        },
        ChkActs: function(g, d, h, c) {
            var e, b, a, f;
            !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
                R: d,
                ar: [oS.R - 1],
                CustomTop: 400 - g.height + g.GetDY()
            })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
            g.ChkSpeed(g);
            return f
        },
        ChkSpeed: function(g) {
            if (!g.DZStep) {
                return
            }
            var h = g.ArDZ,
                d = 4,
                c, b, e, a = g.OSpeed,
                f = [];
            switch (true) {
                case (g.isAttacking || g.FreeFreezeTime || g.FreeSetbodyTime) == 1:
                    a = 0;
                    break;
                case g.FreeSlowTime > 0:
                    a != 1.75 && (a = 1.75)
            }
            while (d--) {
                if ((c = h[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
                    f.push(e);
                    switch (true) {
                        case (e.isAttacking || e.FreeFreezeTime || e.FreeSetbodyTime) == 1:
                            a = 0;
                            break;
                        case e.FreeSlowTime > 0:
                            a != 1.75 && (a = 1.75)
                    }
                }
            }
            if (a != g.DZMSpeed) {
                g.DZMSpeed = a;
                d = f.length;
                while (d--) {
                    (e = f[d]).Speed != a && (e.Speed = a)
                }
                g.Speed != a && (g.Speed = a)
            }
        },
        AttackZombie: function(a) {
            this.ExchangeLR(this, 0);
            var b = this.id;
            this.isAttacking = 1;
            this.EleBody.src = this.PicArr[this.AttackGif];
            oSym.addTask(10, function(d, c) {
                var f = $Z[d],
                    e;
                f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $Z[c]) ? (e.getHit0(e, 10, 0), oSym.addTask(10, arguments.callee, [d, c])) : (f.isAttacking = 0, f.EleBody.src = f.PicArr[f.NormalGif], f.TurnLeft(f)))
            }, [b, a])
        },
        ChkBackupDancer: function(h, g, f) {
            if (!h.PZ) {
                h.ChangeChkActsTo1(h, g, f);
                return
            }
            var b = h.ArDZ,
                d = 4,
                j = 1,
                c, e, a;
            while (d--) {
                (e = b[d]) && (!(c = e[0]) || !(a = $Z[c]) || (a.PZ ? false : (e[0] = "", true))) && (d = j = 0)
            }!h.isAttacking && j ? f.src = h.PicArr[10] : h.Summon(h, g);
            h.ChangeChkActsTo0(h, g, f)
        },
        ChangeChkActsTo0: function(g, e, a) {
            if (!g.PZ) {
                g.ChangeChkActsTo1(g, e, a);
                return
            }
            var d = 4,
                h = g.ArDZ,
                c, b, f;
            while (d--) {
                (b = h[d]) && (c = b[0]) && (f = $Z[c]) && f.beAttacked && (f.LostHeadGif = 10, f.NormalGif = 9, !f.isAttacking && (f.EleBody.src = f.PicArr[9]), f.Speed = 0)
            }
            g.LostHeadGif = 15;
            g.NormalGif = 10;
            g.Speed = g.DZMSpeed = g.DZStep = 0;
            g.DZStepT = oSym.Now + 200;
            oSym.addTask(200, function(j, i) {
                var k = $Z[j];
                k && k.beAttacked && k.ChangeChkActsTo1(k, j, i)
            }, [e, a])
        },
        ChangeChkActsTo1: function(g, e, a) {
            var d = 4,
                h = g.ArDZ,
                c, b, f;
            while (d--) {
                (b = h[d]) && (c = b[0]) && (f = $Z[c]) && f.beAttacked && (f.LostHeadGif = 4, f.NormalGif = 2, !f.isAttacking && (f.EleBody.src = f.PicArr[2]))
            }
            g.LostHeadGif = 4;
            g.NormalGif = 2;
            g.DZStep = 1;
            g.DZStepT = oSym.Now + 220;
            !g.isAttacking && (a.src = g.PicArr[2]);
            g.PZ && oSym.addTask(220, function(j, i) {
                var k = $Z[j];
                k && k.beAttacked && k.ChkBackupDancer(k, j, i)
            }, [e, a])
        },
        TurnLeft: function(c) {
            var a = CZombies.prototype,
                b = c.id;
            c.AttackZombie = a.AttackZombie;
            c.NormalAttack = a.NormalAttack;
            c.OSpeed = 3.5;
            !(c.FreeSlowTime || c.FreeFreezeTime || c.FreeSetbodyTime) && (c.Speed = 3.5);
            c.getSnowPea = OrnNoneZombies.prototype.getSnowPea;
            c.getFreeze = CZombies.prototype.getFreeze;
            oSym.addTask(20, function(d, e) {
                $Z[d] && e.beAttacked && (e.addSpotlight(d, e, e.Ele), oSym.addTask(200, function(g, f, i, h, k) {
                    var j = $Z[g];
                    j && (h > -736 ? h -= 184 : h = 0, f.style.left = h + "px", k > -736 ? k -= 184 : k = 0, i.style.left = k + "px", oSym.addTask(100, arguments.callee, [g, f, i, h, k]))
                }, [d, e.spotlight, e.spotlight2, 0, 0]), oSym.addTask(200, function(h, g) {
                    var f;
                    $Z[g] && h.beAttacked && (f = h.EleBody, !h.isAttacking ? f.src = h.PicArr[10] : h.isAttacking = 0, h.ChangeChkActsTo0(h, g, f))
                }, [e, d]))
            }, [b, c]);
            c.Summon(c, b)
        },
        NormalAttack: function(a) {
            var b = $Z[a];
            b.ExchangeLR(b, 0);
            b.TurnLeft(b)
        },
        Summon: function(d, c) {
            d.LostHeadGif = 16;
            var a = d.EleBody,
                b = d.ChkActs;
            d.ChkActs = d.ChkTmp;
            d.ChkTmp = b;
            a.src = "images/Zombies/DancingZombie/Summon1.gif";
            PlayAudio("dancer");
            oSym.addTask(10, function(f, e) {
                var g = $Z[f];
                g && g.beAttacked && (e.src = "images/Zombies/DancingZombie/Summon2.gif", oSym.addTask(10, function(t, s, x) {
                    var h = $Z[t],
                        v = h.ZX,
                        m = h.ArDZ,
                        n = [],
                        k = "images/Zombies/BackupDancer/Mound.gif" + $Random + Math.random(),
                        r = 4,
                        w = [],
                        u = [],
                        o = 0,
                        q, l;
                    if (h && h.beAttacked) {
                        s.src = "images/Zombies/DancingZombie/Summon3.gif";
                        while (r--) {
                            (q = m[r]) && (!(l = q[0]) || !$Z[l]) && (u[o] = (w[o] = new oBackupDancer).CustomBirth(q[1], q[2](v), 100, q[0] = "Z_" + Math.random()), n.push(NewImg("", k, "z-index:" + q[3] + ";left:" + q[4](v) + "px;top:" + q[5] + "px", EDPZ)), ++o)
                        }
                        oSym.addTask(220, function() {
                            var i = arguments.length;
                            while (i--) {
                                ClearChild(arguments[i])
                            }
                        }, n);
                        oSym.addTask(110, function(A, y, z, i) {
                            var B = $Z[A];
                            B && B.beAttacked && (oP.AppearUP(y, z, i), oSym.addTask(100, function(D, C) {
                                var E = $Z[D];
                                if (E && E.beAttacked) {
                                    return
                                }
                                var j = C.length,
                                    E;
                                while (j--) {
                                    (E = C[j]).ChangeChkActsTo0(E, E.id, E.EleBody)
                                }
                            }, [A, z]))
                        }, [t, u, w, o]);
                        oSym.addTask(200, function(y, i) {
                            var z = $Z[y],
                                j;
                            z && z.beAttacked && (j = z.ChkActs, z.ChkActs = z.ChkTmp, z.ChkTmp = j)
                        }, [t, s])
                    }
                }, [f, e]))
            }, [c, a])
        }
    }),
    oZombie = InheritO(OrnNoneZombies, {
        EName: "oZombie",
        CName: "普通僵尸",
        StandGif: 9,
        PicArr: function() {
            var a = "images/Zombies/Zombie/";
            return ["images/Card/Zombies/Zombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
        }(),
        Produce: '韧性：<font color="#FF0000">低</font></p>这种僵尸喜爱脑髓，贪婪而不知足。脑髓，脑髓，脑髓，夜以继日地追求着。老而臭的脑髓？腐烂的脑髓？都没关系。僵尸需要它们。'
    }),
    oZombie2 = InheritO(oZombie, {
        EName: "oZombie2"
    }),
    oZombie3 = InheritO(oZombie, {
        EName: "oZombie3"
    }),
    oMustacheZombie = InheritO(oZombie, {
        EName: "oMustacheZombie",
        CName: "胡子僵尸",
        HP: 540,
        Produce: '出没于常青之塔的神秘僵尸。<p>韧性：<font color="#FF0000">高</font></p>姜还是老的辣，僵尸界也有这种说法。于是，一些老僵尸也上战场了。',
        PicArr: function() {
            var a = "images/Zombies/Zombie/";
            var b = "images/Zombies/MustacheZombie/";
            return ["images/Card/Zombies/MustacheZombie.png", b + "0.gif", b + "Zombie.gif", b + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, b + "1.gif"]
        }()
    }),
    oFlagZombie = InheritO(oZombie, {
        PicArr: function() {
            var a = "images/Zombies/FlagZombie/";
            return ["images/Card/Zombies/FlagZombie.png", a + "0.gif", a + "FlagZombie.gif", a + "FlagZombieAttack.gif", a + "FlagZombieLostHead.gif", a + "FlagZombieLostHeadAttack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, "images/Zombies/Zombie/ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
        }(),
        EName: "oFlagZombie",
        CName: "旗帜僵尸",
        OSpeed: 2.2,
        Speed: 2.2,
        beAttackedPointR: 101,
        Produce: '旗帜僵尸标志着即将来袭的一大堆僵尸"流"。<p>韧性：<font color="#FF0000">低</font></p>毫无疑问，摇旗僵尸喜爱脑髓。但在私下里他也迷恋旗帜。也许是因为旗帜上也画有脑子吧，这很难说。'
    }),
    OrnIZombies = function() {
        var a = function(f, b) {
            var d = f.OrnHP,
                c = f.HP,
                e = OrnNoneZombies.prototype;
            (d = f.OrnHP -= b) < 1 && (f.HP += d, f.Ornaments = 0, f.EleBody.src = f.PicArr[[f.NormalGif = f.OrnLostNormalGif, f.AttackGif = f.OrnLostAttackGif][f.isAttacking]], f.PlayNormalballAudio = e.PlayNormalballAudio, f.PlayFireballAudio = e.PlayFireballAudio, f.PlaySlowballAudio = e.PlaySlowballAudio, f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = e.getHit);
            f.SetAlpha(f, f.EleBody, 50, .5);
            oSym.addTask(10, function(h, g) {
                (g = $Z[h]) && g.SetAlpha(g, g.EleBody, 100, 1)
            }, [f.id])
        };
        return InheritO(OrnNoneZombies, {
            Ornaments: 1,
            OrnLostNormalGif: 9,
            OrnLostAttackGif: 10,
            getHit: a,
            getHit0: a,
            getHit1: a,
            getHit2: a,
            getHit3: a
        })
    }(),
    oConeheadZombie = InheritO(OrnIZombies, {
        EName: "oConeheadZombie",
        CName: "路障僵尸",
        OrnHP: 370,
        Lvl: 2,
        SunNum: 75,
        StandGif: 11,
        PicArr: function() {
            var b = "images/Zombies/ConeheadZombie/",
                a = "images/Zombies/Zombie/";
            return ["images/Card/Zombies/ConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"]
        }(),
        AudioArr: ["plastichit"],
        PlayNormalballAudio: function() {
            PlayAudio("plastichit")
        },
        Produce: '他的路障头盔，使他两倍坚韧于普通僵尸。<p>韧性：<font color="#FF0000">中</font></p>和其他僵尸一样，路障头僵尸盲目地向前。但某些事物却使他停下脚步，捡起一个交通路障，并固实在自己的脑袋上。是的，他很喜欢参加聚会。'
    }),
    oLionDanceZombie = InheritO(oConeheadZombie, {
        EName: "oLionDanceZombie",
        CName: "舞狮僵尸",
        HP: 370,
        OrnHP: 1100,
        Speed: 4.8,
        Attack: 550,
        width: 216,
        height: 164,
        beAttackedPointL: 60,
        beAttackedPointR: 130,
        PicArr: function() {
            var b = "images/Zombies/LionDanceZombie/",
                a = "images/Zombies/LionDanceZombie/";
            return ["images/Card/Zombies/LionDanceZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"]
        }(),
        Produce: '只出现于常青之塔101层。僵尸设计来自rdrz。<p>韧性：<font color="#FF0000">高</font></p>舞狮是优秀的民间艺术。每逢佳节庆典，民间都以舞狮来助兴，南方以广东的舞狮表演最为有名。狮子是由彩布条制作而成的。每头狮子有两个人合作表演，一人舞头，一人舞尾。表演者在锣鼓音乐下，装扮成狮子的样子，做出狮子的各种形态动作。在表演过程中，舞狮者要以各种招式来表现南派武功，非常富有阳刚之气。'
    }),
    oBucketheadZombie = InheritO(oConeheadZombie, {
        EName: "oBucketheadZombie",
        CName: "铁桶僵尸",
        OrnHP: 1100,
        Lvl: 3,
        SunNum: 125,
        PlayNormalballAudio: function() {
            PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)])
        },
        Produce: '他的铁桶头盔，能极大程度的承受伤害。<p>韧性：<font color="#FF0000">高</font><br>弱点：<font color="#FF0000">土豆雷</font></p>铁桶头僵尸经常戴着水桶，在冷漠的世界里显得独一无二。但事实上，他只是忘记了，那铁桶还在他头上而已。'
    }, {
        PicArr: {
            0: "images/Card/Zombies/BucketheadZombie.png",
            1: "images/Zombies/BucketheadZombie/0.gif",
            2: "images/Zombies/BucketheadZombie/BucketheadZombie.gif",
            3: "images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif",
            9: "images/Zombies/Zombie/Zombie.gif",
            11: "images/Zombies/BucketheadZombie/1.gif"
        }
    }),
    oFootballZombie = InheritO(oConeheadZombie, {
        EName: "oFootballZombie",
        CName: "橄榄球僵尸",
        OrnHP: 1400,
        Lvl: 3,
        SunNum: 175,
        StandGif: 11,
        width: 154,
        height: 160,
        OSpeed: 3.2,
        Speed: 3.2,
        beAttackedPointL: 40,
        beAttackedPointR: 134,
        PlayNormalballAudio: function() {
            PlayAudio("plastichit")
        },
        PicArr: function() {
            var a = "images/Zombies/FootballZombie/";
            return ["images/Card/Zombies/FootballZombie.png", a + "0.gif", a + "FootballZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "OrnLost.gif", a + "OrnLostAttack.gif", a + "1.gif"]
        }(),
        getShadow: function(a) {
            return "left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px"
        },
        Produce: '橄榄球僵尸的表演秀。<p>韧性：<font color="#FF0000">极高</font><br>速度：<font color="#FF0000">快</font></p>在球场上，橄榄球僵尸表现出110%的激情，他进攻防守样样在行。虽然他完全不知道橄榄球是什么。'
    }),
    oHeiFootballZombie = InheritO(oFootballZombie, {
        EName: "oHeiFootballZombie",
        CName: "黑暗橄榄球僵尸",
        OrnHP: 2800,
        Lvl: 3,
        StandGif: 11,
        width: 154,
        height: 160,
        OSpeed: 3.3,
        Speed: 3.3,
        beAttackedPointL: 40,
        beAttackedPointR: 134,
        PicArr: function() {
            var a = "images/Zombies/HeiFootballZombie/";
            return ["images/Card/Zombies/HeiFootballZombie.png", a + "0.gif", a + "FootballZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "OrnLost.gif", a + "OrnLostAttack.gif", a + "1.gif"]
        }(),
        Produce: '黑暗橄榄球僵尸的表演秀。<p>韧性：<font color="#FF0000">极高</font><br>速度：<font color="#FF0000">快</font></p>他着装低调深沉，他是僵尸橄榄球界的领军人物，拥有更强的防御能力，虽然他也完全不知道橄榄球是什么。'
    }),
    oCFootballZombie = InheritO(oFootballZombie, {
        EName: "oCFootballZombie",
        CName: "元帅僵尸",
        PicArr: function() {
            var a = "images/Zombies/wall/FootballZombie/";
            return ["images/Card/Zombies/FootballZombie.png", a + "0.gif", a + "FootballZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "OrnLost.gif", a + "OrnLostAttack.gif", a + "1.gif"]
        }(),
        Produce: ""
    }),
    oPoleVaultingZombie = InheritO(OrnNoneZombies, {
        EName: "oPoleVaultingZombie",
        CName: "撑杆僵尸",
        HP: 270,
        width: 348,
        height: 218,
        OSpeed: 3.2,
        Speed: 3.2,
        beAttackedPointL: 215,
        beAttackedPointR: 260,
        StandGif: 13,
        GetDX: function() {
            return -238
        },
        GetDY: function() {
            return 2
        },
        Lvl: 2,
        SunNum: 75,
        PicArr: function() {
            var a = "images/Zombies/PoleVaultingZombie/";
            return ["images/Card/Zombies/PoleVaultingZombie.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"]
        }(),
        AudioArr: ["polevault", "grassstep"],
        Produce: '撑杆僵尸运用标杆高高地跃过障碍物。<p>韧性：<font color="#FF0000">中</font><Br>速度：<font color="#FF0000">快,而后慢(跳跃后)</font><BR>特点：<font color="#FF0000">跃过他所碰到的第一筑植物</font></p>一些僵尸渴望走得更远、得到更多，这也促使他们由普通成为非凡。那就是撑杆僵尸。',
        getShadow: function(a) {
            return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px"
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        JudgeAttack: function() {
            var g = this,
                b = g.ZX,
                d = g.R + "_",
                c = GetC(b),
                h = oGd.$,
                f, a, e = b - 74;
            for (f = c - 2; f <= c; f++) {
                if (f > 9) {
                    continue
                }
                for (a = 2; a > -1;
                    (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
            }
        },
        getCrushed: function(a) {
            this.NormalAttack(this.id, a.id, a.AttackedLX);
            this.getCrushed = function() {
                return false
            };
            a.Stature > 0 && oSym.addTask(50, function(c) {
                var b = $Z[c];
                b && b.CrushDie()
            }, [this.id]);
            return false
        },
        getRaven: function(a) {
            return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0
        },
        NormalAttack: function(d, b, g) {
            var f = $Z[d],
                a = f.Ele,
                c = f.EleShadow,
                e = f.EleBody;
            e.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
            PlayAudio("grassstep");
            SetHidden(c);
            f.isAttacking = 1;
            f.Altitude = 2;
            f.getFreeze = function() {
                f.getSnowPea(f, 20)
            };
            oSym.addTask(50, function(h) {
                $Z[h] && PlayAudio("polevault")
            }, [d]);
            oSym.addTask(100, function(m, j, i, l, n) {
                var h = $Z[m],
                    k, q, r;
                h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
                    left: h.X + "px"
                }), n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
                    left: h.X + "px"
                }), n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(80, function(s, v) {
                    var u = $Z[s],
                        t;
                    u && (v.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven)
                }, [m, n])))
            }, [d, b, a, c, e])
        }
    }),
    oCPoleVaultingZombie = InheritO(oPoleVaultingZombie, {
        EName: "oCPoleVaultingZombie",
        CName: "棒子僵尸",
        PicArr: function() {
            var b = "images/Zombies/PoleVaultingZombie/";
            var a = "images/Zombies/wall/PoleVaultingZombie/";
            return ["images/Card/Zombies/PoleVaultingZombie.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"]
        }(),
        NormalAttack: function(d, b, g) {
            var f = $Z[d],
                a = f.Ele,
                c = f.EleShadow,
                e = f.EleBody;
            e.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
            PlayAudio("grassstep");
            SetHidden(c);
            f.isAttacking = 1;
            f.Altitude = 2;
            f.getFreeze = function() {
                f.getSnowPea(f, 20)
            };
            oSym.addTask(50, function(h) {
                $Z[h] && PlayAudio("polevault")
            }, [d]);
            oSym.addTask(100, function(m, j, i, l, n) {
                var h = $Z[m],
                    k, q, r;
                h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
                    left: h.X + "px"
                }), n.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
                    left: h.X + "px"
                }), n.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(80, function(s, v) {
                    var u = $Z[s],
                        t;
                    u && (v.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven)
                }, [m, n])))
            }, [d, b, a, c, e])
        }
    }),
    OrnIIZombies = InheritO(OrnNoneZombies, {
        Ornaments: 2,
        BreakPoint: 91,
        NormalGif: 2,
        AttackGif: 3,
        LostHeadGif: 4,
        LostHeadAttackGif: 5,
        OrnLostNormalGif: 6,
        OrnLostAttackGif: 7,
        OrnLostHeadNormalGif: 8,
        OrnLostHeadAttackGif: 9,
        HeadGif: 10,
        DieGif: 11,
        BoomDieGif: 12
    }),
    oNewspaperZombie = InheritO(OrnIIZombies, {
        EName: "oNewspaperZombie",
        CName: "读报僵尸",
        OrnHP: 150,
        Lvl: 2,
        LostPaperGif: 13,
        StandGif: 14,
        width: 216,
        height: 164,
        beAttackedPointL: 60,
        beAttackedPointR: 130,
        LostPaperSpeed: 4.8,
        PicArr: function() {
            var a = "images/Zombies/NewspaperZombie/";
            return ["images/Card/Zombies/NewspaperZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"]
        }(),
        AudioArr: ["newspaper_rarrgh2"],
        Produce: '他的报纸只能提供有限的防御。<p>韧性：<font color="#FF0000">低</font><br>报纸韧性：<font color="#FF0000">低</font><br>速度：正常，而后快(失去报纸后)</p>读报僵尸，他正痴迷于完成他的数独难题。难怪他这么反常。',
        getShadow: function(a) {
            return "left:75px;top:" + (a.height - 25) + "px"
        },
        GoingDie: function(b) {
            var a = this,
                c = a.id;
            a.EleBody.src = b;
            oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
            a.beAttacked = 0;
            a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
            a.AutoReduceHP(c)
        },
        getHurtOrnLost: function(j, a, g, m, c, l, k, i) {
            var e = this;
            if (!e.beAttacked) {
                k && e.DisappearDie();
                return
            }
            var b = e.id,
                h = e.HP,
                d = e.PicArr,
                f = e.isAttacking;
            switch (true) {
                case (h -= g) < 1:
                    e.HP = 0;
                    e.NormalDie();
                    return;
                case h < 91:
                    e.HP = h;
                    e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
                    return
            }
            e.HP = h;
            switch (m) {
                case -1:
                    e.getSlow(e, b, 1e3);
                    break;
                case 1:
                    e.getFireball(e, b, a);
                    break;
                default:
                    !i && j == -1 && e.PlayNormalballAudio()
            }
            SetAlpha(e.EleBody, 50, .5);
            oSym.addTask(10, function(q) {
                var n = $Z[q];
                n && SetAlpha(n.EleBody, 100, 1)
            }, [b])
        },
        getSnowPea: function(c, a, b) {
            PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
            c.getHit0(c, a, b)
        },
        getFirePea: function(f, b, e) {
            f.PlayFireballAudio();
            (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
            f.Attack = 100;
            var d = f.AttackedLX,
                g = f.AttackedRX,
                a = oZ.getArZ(d, d + 40, f.R),
                c = a.length,
                h;
            while (c--) {
                (h = a[c]) != this && h.getFirePeaSputtering()
            }(f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function() {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, .5), oSym.addTask(10, function(j, i) {
                (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1)
            }, [f.id]))
        },
        getHit0: function(c, a, b) {
            b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, .5), oSym.addTask(10, function(e, d) {
                (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
            }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
        },
        getHit1: function(b, a) {
            (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, .5), oSym.addTask(10, function(d, c) {
                (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
            }, [b.id]))
        },
        getHit2: function(b, a) {
            (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.SetAlpha(b, b.EleBody, 50, .5), oSym.addTask(10, function(d, c) {
                (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
            }, [b.id]))
        },
        getHit3: function(b, a) {
            (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, .5), oSym.addTask(10, function(d, c) {
                (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
            }, [b.id]))
        },
        CheckOrnHP: function(g, h, d, c, f, b, a) {
            var e = OrnNoneZombies.prototype;
            (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function() {
                return 1
            }, g.ChkActs1 = function() {
                return 1
            }, g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function(m, l) {
                var k = $Z[m];
                if (!k) {
                    return
                }
                var j = CZombies.prototype,
                    i = k.OSpeed = k.LostPaperSpeed;
                k.ChkActs = j.ChkActs;
                k.ChkActs1 = j.ChkActs1;
                k.Speed && (k.Speed = !k.FreeSlowTime ? i : .5 * i);
                if (!k.beAttacked) {
                    return
                }
                PlayAudio("newspaper_rarrgh2");
                k.EleBody.src = l;
                k.JudgeAttack()
            }, [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]))
        }
    }),
    oCNewspaperZombie = InheritO(oNewspaperZombie, {
        EName: "oCNewspaperZombie"
    }),
    oScreenDoorZombie = InheritO(oNewspaperZombie, {
        EName: "oScreenDoorZombie",
        CName: "铁栅门僵尸",
        OrnHP: 1100,
        Lvl: 3,
        SunNum: 100,
        StandGif: 13,
        width: 166,
        height: 144,
        beAttackedPointL: 60,
        beAttackedPointR: 116,
        PicArr: function() {
            var a = "images/Zombies/ScreenDoorZombie/",
                b = "images/Zombies/Zombie/";
            return ["images/Card/Zombies/ScreenDoorZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", b + "Zombie.gif", b + "ZombieAttack.gif", b + "ZombieLostHead.gif", b + "ZombieLostHeadAttack.gif", b + "ZombieHead.gif" + $Random, b + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
        }(),
        PlayNormalballAudio: function() {
            PlayAudio("splat" + Math.floor(1 + Math.random() * 3))
        },
        Produce: '他的铁栅门是有效的盾牌。<p>韧性：<font color="#FF0000">低</font><br>铁栅门韧性：<font color="#FF0000">高</font><br>弱点：大喷菇和磁力菇</p>门板僵尸上次拜访过的房主防守并不专业，在吃掉房主的脑子后拿走了他家的铁栅门。',
        GoingDie: CZombies.prototype.GoingDie,
        getFirePea: function(c, a, b) {
            PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
            c.getHit0(c, a, b)
        },
        getFirePeaSputtering: function() {},
        getSnowPea: function(c, a, b) {
            PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
            c.getHit0(c, a, b)
        },
        getPea: function(c, a, b) {
            PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
            c.getHit0(c, a, b)
        },
        getHit0: function(c, a, b) {
            b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, .5), oSym.addTask(10, function(e, d) {
                (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
            }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
        },
        CheckOrnHP: function(g, h, d, c, f, b, a) {
            var e = OrnNoneZombies.prototype;
            (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.Ornaments = 0, g.EleBody.src = f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]], g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getPea = e.getPea, g.getFirePea = e.getFirePea, g.getFirePeaSputtering = e.getFirePeaSputtering, g.getSnowPea = g.getSnowPea, g.PlayNormalballAudio = e.PlayNormalballAudio, g.PlayFireballAudio = e.PlayFireballAudio, g.PlaySlowballAudio = e.PlaySlowballAudio, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit)
        },
        getFireball: function(c, a, b) {
            b != c.WalkDirection ? (c.FreeSlowTime = 0, c.Attack = 100, c.Speed != c.OSpeed ? (c.PlayNormalballAudio(), c.Speed = c.OSpeed) : c.PlayFireballAudio()) : c.PlayNormalballAudio()
        },
        getSputtering: function() {},
        getSlow: function(d, a, c, b, e) {
            b != d.WalkDirection || e != -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio()
        }
    }),
    oTrashZombie = InheritO(oScreenDoorZombie, {
        EName: "oTrashZombie",
        CName: "垃圾桶僵尸",
        PicArr: function() {
            var a = "images/Zombies/TrashZombie/",
                b = "images/Zombies/Zombie/";
            return ["images/Card/Zombies/TrashZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", b + "Zombie.gif", b + "ZombieAttack.gif", b + "ZombieLostHead.gif", b + "ZombieLostHeadAttack.gif", b + "ZombieHead.gif" + $Random, b + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
        }(),
        Produce: "出没于常青之塔的神秘僵尸。</p>有这样一个故事：老人买了房子，不久便有、个年轻人在附近踢垃圾桶玩。 老人受不了这些噪音，于是和年轻人说“你每天都来踢垃圾桶，我给你一块钱。”年轻人很高兴，踹起了垃圾桶。三天后，老人说：“因为通货膨胀，明天起我只能给你5毛钱。“年轻人不大开心，但还是接受了。下午，他继续去踹垃圾桶。五天后，老人对他说：“最近没有收到养老金，只能给两毛了。”“两毛钱？”年轻人发起了火，之后便再没来踹垃圾桶了 "
    }),
    oAquaticZombie = InheritO(OrnNoneZombies, {
        StandGif: 4,
        AttackGif: 5,
        HeadGif: 6,
        DieGif: 7,
        WalkGif0: 2,
        WalkGif1: 3,
        CanPass: function(b, a) {
            return a == 2
        },
        BirthCallBack: function(g) {
            var e = g.delayT,
                c = g.id,
                b = g.Ele = $(c),
                d = g.AttackedLX,
                f, a, h;
            f = g.EleShadow = b.firstChild;
            g.EleBody = b.childNodes[1];
            switch (true) {
                case d > GetX(9):
                    g.ChkActs = g.ChkActsL1;
                    g.WalkStatus = 0;
                    break;
                case d < GetX(0):
                    g.ChkActs = g.ChkActsL3;
                    g.WalkStatus = 0;
                    break;
                default:
                    g.ChkActs = g.ChkActsL2;
                    g.WalkStatus = 1;
                    g.EleBody.src = g.PicArr[g.NormalGif = g.WalkGif1];
                    SetHidden(f);
                    NewEle(a = c + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (g.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, b);
                    ImgSpriter(a, c, [
                        ["0 0", 9, 1],
                        ["-97px 0", 9, 2],
                        ["-194px 0", 9, 3],
                        ["-291px 0", 9, 4],
                        ["-388px 0", 9, 5],
                        ["-485px 0", 9, 6],
                        ["-582px 0", 9, 7],
                        ["-679px 0", 9, -1]
                    ], 0, function(i, j) {
                        ClearChild($(i))
                    })
            }
            e ? oSym.addTask(e, function(j, i) {
                var k = $Z[j];
                k && (k.FreeSetbodyTime = 0, SetBlock(i))
            }, [c, b]) : SetBlock(b)
        },
        ChkActsL1: function(f, e, g, d) {
            var c, a, b = f.id;
            !(f.FreeFreezeTime || f.FreeSetbodyTime) && (f.AttackedRX -= c = f.Speed, LX = f.ZX = f.AttackedLX -= c, f.Ele.style.left = Math.floor(f.X -= c) + "px");
            f.AttackedLX < GetX(9) && (PlayAudio("zombie_entering_water"), f.WalkStatus = 1, f.EleBody.src = f.PicArr[f.NormalGif = f.WalkGif1], SetHidden(f.EleShadow), NewEle(a = b + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (f.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, f.Ele), f.ChkActs = f.ChkActsL2, ImgSpriter(a, b, [
                ["0 0", 9, 1],
                ["-97px 0", 9, 2],
                ["-194px 0", 9, 3],
                ["-291px 0", 9, 4],
                ["-388px 0", 9, 5],
                ["-485px 0", 9, 6],
                ["-582px 0", 9, 7],
                ["-679px 0", 9, -1]
            ], 0, function(h, i) {
                ClearChild($(h))
            }));
            return 1
        },
        ChkActsL2: function(d, c, e, b) {
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px"));
            d.AttackedLX < GetX(0) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3);
            return 1
        },
        ChkActsL3: CZombies.prototype.ChkActs,
        ChkActs1: function(d, c, e, b) {
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedLX += a = d.Speed, d.ZX = d.AttackedRX += a, d.Ele.style.left = Math.ceil(d.X += a) + "px"));
            d.AttackedLX > GetX(9) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActs2);
            return 1
        },
        ChkActs2: function(e, c, f, b) {
            var a, d;
            !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), !e.isAttacking ? (e.AttackedLX += a = e.Speed) > oS.W ? (f.splice(b, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += a, e.Ele.style.left = Math.ceil(e.X += a) + "px", d = 1) : d = 1) : d = 1;
            return d
        },
        ExchangeLR: function(d, b) {
            var c = d.width,
                f = d.beAttackedPointL,
                a = d.beAttackedPointR,
                e = d.Ele;
            e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
            d.beAttackedPointR = c - f;
            d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
            d.ExchangeLR2(d, d.EleBody, b)
        },
        GoingDie: function() {
            var b = this,
                c = b.id,
                a = b.PicArr;
            b.EleBody.src = a[7] + Math.random();
            b.GoingDieHead(c, a, b);
            b.beAttacked = 0;
            b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
            b.AutoReduceHP(c)
        },
        AutoReduceHP: function(a) {
            oSym.addTask(100, function(c) {
                var b = $Z[c];
                b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]))
            }, [a])
        },
        ExplosionDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        DisappearDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        CrushDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        NormalDie: function() {
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        }
    }),
    oDuckyTubeZombie1 = InheritO(oAquaticZombie, {
        EName: "oDuckyTubeZombie1",
        CName: "鸭子救生圈僵尸",
        beAttackedPointR: 130,
        GetDY: function() {
            return 5
        },
        Produce: '鸭子救生圈能让僵尸能浮在水面上。<p>韧性：<font color="#FF0000">低</font><br>只在水池关卡出现</font></p>只有特定的僵尸才能成为救生圈僵尸。并不是每个僵尸都能胜任的。有些救生圈有点漏气，但他们没能注意到，所以他们离开并放弃了对脑子的渴求。',
        PicArr: function() {
            var a = "images/Zombies/DuckyTubeZombie1/";
            return ["images/Card/Zombies/DuckyTubeZombie1.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "ZombieHead.gif" + $Random, a + "Die.gif" + $Random]
        }(),
        AudioArr: ["zombie_entering_water"]
    }),
    oWarshipsZombie = InheritO(oDuckyTubeZombie1, {
        EName: "oWarshipsZombie",
        CName: "军舰僵尸",
        HP: "5000",
        OSpeed: .1,
        Speed: .1,
        width: 464,
        height: 364,
        beAttackedPointL: 140,
        beAttackedPointR: 290,
        Attack: 550,
        BookHandBack: 4.9,
        getShadow: function(a) {
            return "display:none"
        },
        Produce: '通常在最后一波时出现于池塘里。<p>韧性：<font color="#FF0000">极高</font><br>只在水池关卡出现</font></p>你一定很好奇军舰上的三只僵尸藏在水里是什么滋味，他们眼睁睁看着一只只同伴坠入海水生出，不过这些都不重要：“脑子！”。',
        PicArr: function() {
            var a = "images/Zombies/WarshipsZombie/";
            return ["images/Card/Zombies/WarshipsZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "ZombieHead.gif" + $Random, a + "Die.gif" + $Random]
        }()
    }),
    oDuckyTubeZombie2 = InheritO(oDuckyTubeZombie1, {
        EName: "oDuckyTubeZombie2",
        CName: "路障僵尸骑鸭子",
        OrnHP: 370,
        Lvl: 2,
        SunNum: 75,
        CanDisplay: 0,
        OrnLostNormalGif: 9,
        OrnLostAttackGif: 10,
        PlayNormalballAudio: function() {
            PlayAudio("plastichit")
        },
        PicArr: function() {
            var b = "images/Zombies/DuckyTubeZombie2/",
                a = "images/Zombies/DuckyTubeZombie1/";
            return ["images/Card/Zombies/DuckyTubeZombie1.png", b + "0.gif", b + "Walk1.gif", b + "Walk2.gif", b + "1.gif", b + "Attack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Walk1.gif", a + "Walk2.gif", a + "Attack.gif"]
        }(),
        AudioArr: ["plastichit", "zombie_entering_water"],
        getHit: OrnIZombies.prototype.getHit,
        getHit0: OrnIZombies.prototype.getHit0,
        getHit1: OrnIZombies.prototype.getHit1,
        getHit2: OrnIZombies.prototype.getHit2,
        getHit3: OrnIZombies.prototype.getHit3
    }),
    oDuckyTubeZombie3 = InheritO(oDuckyTubeZombie2, {
        EName: "oDuckyTubeZombie3",
        CName: "铁桶僵尸骑鸭子",
        OrnHP: 1100,
        Lvl: 3,
        SunNum: 125,
        PlayNormalballAudio: function() {
            PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)])
        },
        AudioArr: ["shieldhit", "shieldhit2", "zombie_entering_water"],
        PicArr: function() {
            var b = "images/Zombies/DuckyTubeZombie3/",
                a = "images/Zombies/DuckyTubeZombie1/";
            return ["images/Card/Zombies/DuckyTubeZombie1.png", b + "0.gif", b + "Walk1.gif", b + "Walk2.gif", b + "1.gif", b + "Attack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Walk1.gif", a + "Walk2.gif", a + "Attack.gif"]
        }()
    }),
    oDuckyTubeZombie4 = InheritO(oDuckyTubeZombie3, {
        EName: "oDuckyTubeZombie4",
        CName: "铁栅门僵尸骑鸭子",
        PicArr: function() {
            var b = "images/Zombies/DuckyTubeZombie4/",
                a = "images/Zombies/DuckyTubeZombie1/";
            return ["images/Card/Zombies/DuckyTubeZombie1.png", b + "0.gif", b + "Walk1.gif", b + "Walk2.gif", b + "1.gif", b + "Attack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Walk1.gif", a + "Walk2.gif", a + "Attack.gif"]
        }(),
        getHit: OrnIIZombies.prototype.getHit,
        getHit0: oScreenDoorZombie.prototype.getHit0,
        getHit1: OrnIIZombies.prototype.getHit1,
        getHit2: OrnIIZombies.prototype.getHit2,
        getHit3: OrnIIZombies.prototype.getHit3,
        getSnowPea: oScreenDoorZombie.prototype.getSnowPea,
        CheckOrnHP: oScreenDoorZombie.prototype.CheckOrnHP
    }),
    oAquaticZombie = InheritO(OrnNoneZombies, {
        StandGif: 4,
        AttackGif: 5,
        HeadGif: 6,
        DieGif: 7,
        WalkGif0: 2,
        WalkGif1: 3,
        CanPass: function(b, a) {
            return a == 2
        },
        BirthCallBack: function(g) {
            var e = g.delayT,
                c = g.id,
                b = g.Ele = $(c),
                d = g.AttackedLX,
                f, a, h;
            f = g.EleShadow = b.firstChild;
            g.EleBody = b.childNodes[1];
            switch (true) {
                case d > GetX(9):
                    g.ChkActs = g.ChkActsL1;
                    g.WalkStatus = 0;
                    break;
                case d < GetX(0):
                    g.ChkActs = g.ChkActsL3;
                    g.WalkStatus = 0;
                    break;
                default:
                    g.ChkActs = g.ChkActsL2;
                    g.WalkStatus = 1;
                    g.EleBody.src = g.PicArr[g.NormalGif = g.WalkGif1];
                    SetHidden(f);
                    NewEle(a = c + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (g.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, b);
                    ImgSpriter(a, c, [
                        ["0 0", 9, 1],
                        ["-97px 0", 9, 2],
                        ["-194px 0", 9, 3],
                        ["-291px 0", 9, 4],
                        ["-388px 0", 9, 5],
                        ["-485px 0", 9, 6],
                        ["-582px 0", 9, 7],
                        ["-679px 0", 9, -1]
                    ], 0, function(i, j) {
                        ClearChild($(i))
                    })
            }
            e ? oSym.addTask(e, function(j, i) {
                var k = $Z[j];
                k && (k.FreeSetbodyTime = 0, SetBlock(i))
            }, [c, b]) : SetBlock(b)
        },
        ChkActsL1: function(f, e, g, d) {
            var c, a, b = f.id;
            !(f.FreeFreezeTime || f.FreeSetbodyTime) && (f.AttackedRX -= c = f.Speed, LX = f.ZX = f.AttackedLX -= c, f.Ele.style.left = Math.floor(f.X -= c) + "px");
            f.AttackedLX < GetX(9) && (PlayAudio("zombie_entering_water"), f.WalkStatus = 1, f.EleBody.src = f.PicArr[f.NormalGif = f.WalkGif1], SetHidden(f.EleShadow), NewEle(a = b + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (f.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, f.Ele), f.ChkActs = f.ChkActsL2, ImgSpriter(a, b, [
                ["0 0", 9, 1],
                ["-97px 0", 9, 2],
                ["-194px 0", 9, 3],
                ["-291px 0", 9, 4],
                ["-388px 0", 9, 5],
                ["-485px 0", 9, 6],
                ["-582px 0", 9, 7],
                ["-679px 0", 9, -1]
            ], 0, function(h, i) {
                ClearChild($(h))
            }));
            return 1
        },
        ChkActsL2: function(d, c, e, b) {
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px"));
            d.AttackedLX < GetX(0) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3);
            return 1
        },
        ChkActsL3: CZombies.prototype.ChkActs,
        ChkActs1: function(d, c, e, b) {
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedLX += a = d.Speed, d.ZX = d.AttackedRX += a, d.Ele.style.left = Math.ceil(d.X += a) + "px"));
            d.AttackedLX > GetX(9) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActs2);
            return 1
        },
        ChkActs2: function(e, c, f, b) {
            var a, d;
            !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), !e.isAttacking ? (e.AttackedLX += a = e.Speed) > oS.W ? (f.splice(b, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += a, e.Ele.style.left = Math.ceil(e.X += a) + "px", d = 1) : d = 1) : d = 1;
            return d
        },
        ExchangeLR: function(d, b) {
            var c = d.width,
                f = d.beAttackedPointL,
                a = d.beAttackedPointR,
                e = d.Ele;
            e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
            d.beAttackedPointR = c - f;
            d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
            d.ExchangeLR2(d, d.EleBody, b)
        },
        GoingDie: function() {
            var b = this,
                c = b.id,
                a = b.PicArr;
            b.EleBody.src = a[7] + Math.random();
            b.GoingDieHead(c, a, b);
            b.beAttacked = 0;
            b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
            b.AutoReduceHP(c)
        },
        AutoReduceHP: function(a) {
            oSym.addTask(100, function(c) {
                var b = $Z[c];
                b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]))
            }, [a])
        },
        ExplosionDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        DisappearDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        CrushDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        NormalDie: function() {
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        }
    }),
    oSnorkelZombie = InheritO(oDuckyTubeZombie1, {
        EName: "oSnorkelZombie",
        CName: "潜水僵尸",
        Lvl: 1,
        SunNum: 75,
        width: 143,
        height: 200,
        beAttackedPointL: 40,
        beAttackedPointR: 100,
        OSpeed: 3.2,
        Speed: 3.2,
        Altitude: 1,
        BirthCallBack: function(g) {
            var e = g.delayT,
                c = g.id,
                b = g.Ele = $(c),
                d = g.AttackedLX,
                f, a, h;
            f = g.EleShadow = b.firstChild;
            g.EleBody = b.childNodes[1];
            switch (true) {
                case d > GetX(9):
                    g.ChkActs = g.ChkActsL1;
                    g.WalkStatus = 0;
                    break;
                case d < GetX(0):
                    g.ChkActs = g.ChkActsL3;
                    g.WalkStatus = 0;
                    break;
                default:
                    g.ChkActs = g.ChkActsL2;
                    g.WalkStatus = 1;
                    g.EleBody.src = g.PicArr[g.NormalGif = g.WalkGif1];
                    SetHidden(f);
                    NewEle(a = c + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (g.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, b);
                    ImgSpriter(a, c, [
                        ["0 0", 9, 1],
                        ["-97px 0", 9, 2],
                        ["-194px 0", 9, 3],
                        ["-291px 0", 9, 4],
                        ["-388px 0", 9, 5],
                        ["-485px 0", 9, 6],
                        ["-582px 0", 9, 7],
                        ["-679px 0", 9, -1]
                    ], 0, function(i, j) {
                        ClearChild($(i))
                    })
            }
            e ? oSym.addTask(e, function(j, i) {
                var k = $Z[j];
                k && (k.FreeSetbodyTime = 0, SetBlock(i))
            }, [c, b]) : SetBlock(b)
        },
        Produce: '潜水僵尸可以在水下前行。<p>韧性：<font color="#FF0000">低</font><br>特点：<font color="#FF0000">潜泳以避免遭到攻击<br>只在水池关卡出现</font></p>僵尸不呼吸。他们不需要空气。那么为什么潜水僵尸需要一套潜水装置来潜水呢？<br>答案：同行的压力。',
        JumpTime: 40,
        getShadow: function(a) {
            return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px"
        },
        PicArr: function() {
            var a = "images/Zombies/SnorkelZombie/";
            return ["images/Card/Zombies/SnorkelZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Risk.gif" + $Random, a + "Sink.gif" + $Random]
        }(),
        AudioArr: ["zombie_entering_water"],
        Jump: function(a) {
            a.beAttacked && (PlayAudio("zombie_entering_water"), a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8] + Math.random(), oSym.addTask(160, function(c, b) {
                $Z[c] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 0, b.OSpeed = b.Speed = 2, b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2)
            }, [a.id, a]), a.ChkActs = function() {
                return 1
            })
        },
        ChkActsL1: function(d, c, e, b) {
            if (d.JumpTime <= 0) {
                d.Jump(d);
                return 1
            }
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= a = d.Speed, LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
            return 1
        },
        ChkActsL2: function(d, c, e, b) {
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedLX > GetX(0) ? (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px")) : d.beAttacked && (d.WalkStatus = 0, d.Altitude = 1, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3));
            return 1
        },
        JudgeAttack: function() {
            var e = this,
                b = e.ZX,
                c = e.R + "_",
                d = GetC(b),
                g = oGd.$,
                a, f = e.id;
            (a = e.JudgeLR(e, c, d, b, g) || e.JudgeSR(e, c, d, b, g)) ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[9] + Math.random(), oSym.addTask(50, function(i, h) {
                $Z[i] && h.beAttacked && (h.EleBody.src = h.PicArr[h.AttackGif], h.Altitude = 1, h.NormalAttack(a[0], a[1]))
            }, [f, e])) : e.NormalAttack(a[0], a[1]): e.isAttacking && (e.EleBody.src = e.PicArr[10] + Math.random(), e.Altitude = 0, oSym.addTask(70, function(i, h) {
                $Z[i] && h.beAttacked && (h.isAttacking = 0, h.EleBody.src = h.PicArr[h.NormalGif])
            }, [f, e]))
        },
        NormalAttack: function(b, a) {
            oSym.addTask(100, function(d, c) {
                var f = $Z[d],
                    e;
                f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $P[c]) && e.getHurt(f, 0, 100), f.JudgeAttack())
            }, [b, a])
        },
        JudgeAttackH: function() {
            var c = this,
                b = oZ.getZ0(c.ZX, c.R),
                d = c.id,
                a;
            b && b.beAttacked && b.AttackedLX < 900 && b.Altitude < 2 ? !c.isAttacking ? (c.isAttacking = 1, c.EleBody.src = c.PicArr[9] + Math.random(), a = b.id, !b.isAttacking && b.AttackZombie2(b, a, d), oSym.addTask(50, function(g, h, f, e) {
                $Z[h] && g.beAttacked && ($Z[e] && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, g.AttackZombie(h, e)) : g.JudgeAttackH())
            }, [c, d, b, a])) : c.AttackZombie(d, a) : c.isAttacking && (c.EleBody.src = c.PicArr[10] + Math.random(), c.Altitude = 0, oSym.addTask(70, function(f, e) {
                $Z[f] && e.beAttacked && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif])
            }, [d, c]))
        },
        AttackZombie2: function(c, b, a) {
            c.isAttacking = 1;
            c.EleBody.src = c.PicArr[9] + Math.random();
            oSym.addTask(50, function(g, e, d, f) {
                $Z[e] && g.beAttacked && ((f = $Z[d]) && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, oSym.addTask(10, function(k, i, j, h) {
                    $Z[i] && k.beAttacked && !k.FreeFreezeTime && !k.FreeSetbodyTime && ($Z[h] && j.beAttacked ? (j.getHit0(j, 10, 0), oSym.addTask(10, arguments.callee, [k, i, j, h])) : (k.EleBody.src = k.PicArr[10] + Math.random(), k.Altitude = 0, oSym.addTask(70, function(l, m) {
                        $Z[l] && m.beAttacked && (m.isAttacking = 0, m.EleBody.src = m.PicArr[m.NormalGif])
                    }, [i, k])))
                }, [g, e, f, d])) : (g.EleBody.src = g.PicArr[10] + Math.random(), g.Altitude = 0, oSym.addTask(70, function(h, i) {
                    $Z[h] && i.beAttacked && (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif])
                }, [e, g])))
            }, [c, b, a])
        },
        AutoReduceHP: function(a) {
            oSym.addTask(100, function(c) {
                var b = $Z[c];
                b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(200, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]))
            }, [a])
        }
    }),
    oCSnorkelZombie = InheritO(oSnorkelZombie, {}),
    oSubZombie = InheritO(oSnorkelZombie, {
        EName: "oSubZombie",
        CName: "潜水艇僵尸",
        HP: "500",
        OSpeed: 1,
        Speed: 1,
        width: 464,
        height: 364,
        beAttackedPointL: 140,
        beAttackedPointR: 290,
        BookHandBack: 4.9,
        Produce: '强劲有力的机械潜水艇，可以在水中躲过大多数攻击。<p>韧性：<font color="#FF0000">极高</font><br>特点：<font color="#FF0000">潜入水底以避免遭到攻击<br>只在水池关卡出现</font></p>这是由作者僵尸亲自打造的无敌潜水艇,不要妄想击碎他，他的猛烈进攻，只会让你的植物死得更快！。',
        PicArr: function() {
            var a = "images/Zombies/SubZombie/";
            return ["images/Card/Zombies/SubZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Risk.gif" + $Random, a + "Sink.gif" + $Random]
        }()
    }),
    oSmallZombie = InheritO(oZombie, {
        EName: "oSmallZombie",
        CName: "小领带僵尸",
        HP: 67,
        width: 83,
        height: 72,
        beAttackedPointL: 41,
        beAttackedPointR: 78,
        BreakPoint: 25,
        Init: function(e, g, c, b) {
            var a = 0,
                f = this,
                d = [];
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
            while (--b) {
                g.CanPass(b, c[b]) && (d[a++] = b)
            }
            g.ArR = d;
            g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>']
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        getShadow: function(a) {
            return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px"
        }
    }),
    oSmallFlagZombie = InheritO(oFlagZombie, {
        EName: "oSmallFlagZombie",
        CName: "小旗帜僵尸",
        HP: 67,
        width: 83,
        height: 72,
        beAttackedPointL: 41,
        beAttackedPointR: 78,
        BreakPoint: 25,
        Init: function(e, g, c, b) {
            var a = 0,
                f = this,
                d = [];
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
            while (--b) {
                g.CanPass(b, c[b]) && (d[a++] = b)
            }
            g.ArR = d;
            g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>']
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        getShadow: function(a) {
            return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px"
        }
    }),
    oSmallDuckyTubeZombie1 = InheritO(oDuckyTubeZombie1, {
        EName: "oSmallDuckyTubeZombie1",
        CName: "小鸭子救生圈僵尸",
        HP: 67,
        width: 83,
        height: 72,
        beAttackedPointL: 41,
        beAttackedPointR: 73,
        BreakPoint: 25,
        Init: function(e, g, c, b) {
            var a = 0,
                f = this,
                d = [];
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
            while (--b) {
                g.CanPass(b, c[b]) && (d[a++] = b)
            }
            g.ArR = d;
            g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>']
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        getShadow: function(a) {
            return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px"
        }
    }),
    oSmallConeheadZombie = InheritO(oConeheadZombie, {
        EName: "oSmallConeheadZombie",
        CName: "小路障僵尸",
        OrnHP: 92,
        HP: 67,
        width: 83,
        height: 72,
        beAttackedPointL: 41,
        beAttackedPointR: 78,
        BreakPoint: 25,
        Init: function(e, g, c, b) {
            var a = 0,
                f = this,
                d = [];
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
            while (--b) {
                g.CanPass(b, c[b]) && (d[a++] = b)
            }
            g.ArR = d;
            g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>']
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        getShadow: function(a) {
            return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px"
        }
    }),
    oSmallFootballZombie = InheritO(oFootballZombie, {
        EName: "oSmallFootballZombie",
        CName: "小橄榄球僵尸",
        OrnHP: 350,
        HP: 67,
        width: 77,
        height: 80,
        beAttackedPointL: 20,
        beAttackedPointR: 77,
        BreakPoint: 25,
        Init: function(e, g, c, b) {
            var a = 0,
                f = this,
                d = [];
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
            while (--b) {
                g.CanPass(b, c[b]) && (d[a++] = b)
            }
            g.ArR = d;
            g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:77px;height:80px;top:", 'px" src="', '"></div>']
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        getShadow: function(a) {
            return "width:43px;height:18px;left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px"
        }
    }),
    oSmallSnorkelZombie = InheritO(oSnorkelZombie, {
        EName: "oSmallSnorkelZombie",
        CName: "小潜水僵尸",
        HP: 67,
        width: 71,
        height: 100,
        beAttackedPointL: 20,
        beAttackedPointR: 50,
        BreakPoint: 25,
        Init: function(e, g, c, b) {
            var a = 0,
                f = this,
                d = [];
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
            while (--b) {
                g.CanPass(b, c[b]) && (d[a++] = b)
            }
            g.ArR = d;
            g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:71px;height:100px;top:", 'px" src="', '"></div>']
        },
        GoingDieHead: function(c, a, b) {
            oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:71px;height:105px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
        },
        getShadow: function(a) {
            return "width:43px;height:18px;left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px"
        }
    }),
    oZomboni = function() {
        var a = function(d, b) {
            var c = d.HP;
            switch (true) {
                case (d.HP = c -= b) < 200:
                    d.GoingDie();
                    d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function() {};
                    return;
                case c < 391:
                    d.EleBody.src = "images/Zombies/Zomboni/3.gif";
                    break;
                case c < 871:
                    d.EleBody.src = "images/Zombies/Zomboni/2.gif"
            }
            d.SetAlpha(d, d.EleBody, 50, .5);
            oSym.addTask(10, function(f, e) {
                (e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1)
            }, [d.id])
        };
        return InheritO(OrnNoneZombies, {
            EName: "oZomboni",
            CName: "冰车僵尸",
            HP: 1350,
            Lvl: 3,
            StandGif: 2,
            DieGif: 6,
            BoomDieGif: 7,
            BookHandPosition: "40% 35%",
            width: 464,
            height: 364,
            GetDTop: 104,
            beAttackedPointL: 140,
            beAttackedPointR: 290,
            BreakPoint: 200,
            SunNum: 350,
            GetDY: function() {
                return 0
            },
            OSpeed: 2.5,
            Speed: 2.5,
            AKind: 2,
            Attack: 50,
            Produce: '冰车僵尸运用冰雪，碾过你的植物。<p>韧性：<font color="#FF0000">高</font><br>特点：<font color="#FF0000">碾压植物，留下条冰道</font></p>经常被误以为是在驾驶着冰车的僵尸，但事实上冰车僵尸是种完全不同的生物形式，他与太空兽人联系更紧密而不是僵尸。',
            PicArr: function() {
                var b = "images/Zombies/Zomboni/";
                return ["images/Card/Zombies/Zomboni.png", b + "0.gif", b + "1.gif", b + "2.gif", b + "3.gif", b + "4.gif", b + "5.gif" + $Random, b + "BoomDie.gif" + $Random, b + "ice.png", b + "ice_cap.png"]
            }(),
            AudioArr: ["zamboni", "explosion"],
            BirthCallBack: function(h) {
                var g = h.delayT,
                    e = h.id,
                    c = h.Ele = $(e),
                    d = h.R,
                    f, b = oGd.$Ice;
                h.EleShadow = c.firstChild;
                h.EleBody = c.childNodes[1];
                !b[d] ? (f = NewEle("dIceCar" + d, "div", "position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:72px", 0, EDPZ), NewImg("", "images/interface/blank.png", "position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/Zomboni/ice.png) repeat-x", f), NewImg("", "images/Zombies/Zomboni/ice_cap.png", "position:absolute;display:none;left:0", f), b[d] = [1, 11, h.AttackedLX]) : ++b[d][0];
                g ? oSym.addTask(g, function(j, i) {
                    var k = $Z[j];
                    k && (k.FreeSetbodyTime = 0, SetBlock(i), PlayAudio("zamboni"))
                }, [e, c]) : (SetBlock(c), PlayAudio("zamboni"))
            },
            ChkActs: function(e, j, q, k) {
                var b, r, m, g, n = oGd.$Ice[j],
                    d, h, f, c, l = $("dIceCar" + j);
                e.JudgeAttack();
                (r = e.AttackedRX -= b = e.Speed) < -50 ? (q.splice(k, 1), e.DisappearDie(), m = 0) : (r < 100 && !e.PointZombie && (e.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), e.ChangeR({
                    R: j,
                    ar: [oS.R - 1],
                    CustomTop: 400 - e.height + e.GetDY()
                })), e.ZX = e.AttackedLX -= b, e.Ele.style.left = Math.floor(e.X -= b) + "px", m = 1);
                d = e.X;
                h = d + 250;
                f = d + 100;
                c = GetC(h);
                c > -1 && c < n[1] && (oGd.$Crater[j + "_" + c] = 1, n[1] = c);
                h > 120 && h < n[2] && (n[2] = h, l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)", l.childNodes[1].style.left = Math.max(0, f) + "px");
                GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= .005);
                return m
            },
            ChkActs1: function(f, d, g, c) {
                var b, e;
                f.JudgeAttack();
                (f.AttackedLX += b = f.Speed) > oS.W ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (f.ZX = f.AttackedRX += b, f.Ele.style.left = Math.ceil(f.X += b) + "px", e = 1);
                return e
            },
            getPea: function(c, b) {
                PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
                c.getHit0(c, b)
            },
            getFirePea: function(c, b) {
                PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
                c.getHit0(c, b)
            },
            getSnowPea: function(c, b) {
                PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
                c.getHit0(c, b)
            },
            getFirePeaSputtering: function() {},
            getFreeze: function(c, b) {
                c.getHit0(c, 20)
            },
            getShadow: function(b) {
                return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px"
            },
            getHit: a,
            getHit0: a,
            getHit1: a,
            getHit2: a,
            getHit3: a,
            GoingDie: function() {
                var b = this;
                b.beAttacked = 0;
                b.AutoReduceHP(b.id)
            },
            NormalDie: function() {
                var b = this;
                PlayAudio("explosion");
                b.EleBody.src = b.PicArr[b.DieGif] + Math.random();
                oSym.addTask(70, ClearChild, [b.Ele]);
                b.HP = 0;
                delete $Z[b.id];
                b.JudgeIce();
                b.PZ && oP.MonPrgs()
            },
            DisappearDie: function() {
                var b = this;
                ClearChild(b.Ele);
                b.HP = 0;
                delete $Z[b.id];
                b.JudgeIce();
                b.PZ && oP.MonPrgs()
            },
            ExplosionDie: function() {
                var b = this;
                b.EleBody.src = b.PicArr[b.BoomDieGif] + Math.random();
                oSym.addTask(300, ClearChild, [b.Ele]);
                b.HP = 0;
                delete $Z[b.id];
                b.JudgeIce();
                b.PZ && oP.MonPrgs()
            },
            CrushDie: function() {
                this.NormalDie()
            },
            JudgeIce: function() {
                var d = this,
                    b = d.R,
                    e = $("dIceCar" + b),
                    c = oGd.$Ice[b];
                e && e.childNodes[1] && SetBlock(e.childNodes[1]);
                --c[0] <= 0 && oSym.addTask(3e3, function(k, h) {
                    var j = oGd.$Ice[h],
                        g, f = oGd.$Crater;
                    if (j && j[0] <= 0 && k) {
                        ClearChild(k);
                        g = j[1];
                        while (g < 11) {
                            delete f[h + "_" + g++];
                            delete oGd.$Ice[h]
                        }
                    }
                }, [e, b])
            },
            flatTire: function() {
                var b = this;
                b.EleBody.src = "images/Zombies/Zomboni/4.gif";
                b.beAttacked = 0;
                b.HP = 0;
                b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {};
                b.ChkActs = b.ChkActs1 = function() {};
                oSym.addTask(290, function(e, c) {
                    var d = $Z[e];
                    d && d.NormalDie()
                }, [b.id, b.EleBody])
            },
            JudgeAttack: function() {
                var f = this,
                    c = f.ZX,
                    d = f.R + "_",
                    e = GetC(c),
                    g = oGd.$,
                    b;
                (b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1])
            },
            JudgeLR: function(e, c, d, b, f) {
                return d > 10 || d < 1 ? false : function() {
                    c += --d + "_";
                    var g = 3,
                        h;
                    while (g--) {
                        if (h = f[c + g]) {
                            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false
                        }
                    }
                }()
            },
            JudgeSR: function(e, c, d, b, f) {
                return d > 9 ? false : function() {
                    c += d + "_";
                    var g = 3,
                        h;
                    while (g--) {
                        if (h = f[c + g]) {
                            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false
                        }
                    }
                }()
            },
            NormalAttack: function(c, b) {
                var d = $Z[c];
                $P[b].getHurt(d, 2, d.Attack)
            },
            getThump: function() {
                this.NormalDie()
            }
        })
    }(),
    oCZomboni = function() {
        var a = function(d, b) {
            var c = d.HP;
            switch (true) {
                case (d.HP = c -= b) < 200:
                    d.GoingDie();
                    d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function() {};
                    return;
                case c < 391:
                    d.EleBody.src = "images/Zombies/wall/Zomboni/3.gif";
                    break;
                case c < 871:
                    d.EleBody.src = "images/Zombies/wall/Zomboni/2.gif"
            }
            d.SetAlpha(d, d.EleBody, 50, .5);
            oSym.addTask(10, function(f, e) {
                (e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1)
            }, [d.id])
        };
        return InheritO(oZomboni, {
            EName: "oCZomboni",
            CName: "油车僵尸",
            HP: 1350,
            Lvl: 3,
            StandGif: 2,
            DieGif: 6,
            BoomDieGif: 7,
            BookHandPosition: "40% 35%",
            width: 464,
            height: 364,
            GetDTop: 104,
            beAttackedPointL: 140,
            beAttackedPointR: 290,
            BreakPoint: 200,
            SunNum: 350,
            GetDY: function() {
                return 0
            },
            OSpeed: 2.5,
            Speed: 2.5,
            AKind: 2,
            Attack: 50,
            PicArr: function() {
                var b = "images/Zombies/wall/Zomboni/";
                return ["images/Card/Zombies/Zomboni.png", b + "0.gif", b + "1.gif", b + "2.gif", b + "3.gif", b + "4.gif", b + "5.gif" + $Random, b + "BoomDie.gif" + $Random, b + "ice.png", b + "ice_cap.png"]
            }(),
            AudioArr: ["zamboni", "explosion"],
            BirthCallBack: function(h) {
                var g = h.delayT,
                    e = h.id,
                    c = h.Ele = $(e),
                    d = h.R,
                    f, b = oGd.$Ice;
                h.EleShadow = c.firstChild;
                h.EleBody = c.childNodes[1];
                !b[d] ? (f = NewEle("dIceCar" + d, "div", "position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:72px", 0, EDPZ), NewImg("", "images/interface/blank.png", "position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/wall/Zomboni/ice.png) repeat-x", f), NewImg("", "images/Zombies/wall/Zomboni/ice_cap.png", "position:absolute;display:none;left:0", f), b[d] = [1, 11, h.AttackedLX]) : ++b[d][0];
                g ? oSym.addTask(g, function(j, i) {
                    var k = $Z[j];
                    k && (k.FreeSetbodyTime = 0, SetBlock(i), PlayAudio("zamboni"))
                }, [e, c]) : (SetBlock(c), PlayAudio("zamboni"))
            },
            ChkActs: function(e, j, q, k) {
                var b, r, m, g, n = oGd.$Ice[j],
                    d, h, f, c, l = $("dIceCar" + j);
                e.JudgeAttack();
                (r = e.AttackedRX -= b = e.Speed) < -50 ? (q.splice(k, 1), e.DisappearDie(), m = 0) : (r < 100 && !e.PointZombie && (e.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), e.ChangeR({
                    R: j,
                    ar: [oS.R - 1],
                    CustomTop: 400 - e.height + e.GetDY()
                })), e.ZX = e.AttackedLX -= b, e.Ele.style.left = Math.floor(e.X -= b) + "px", m = 1);
                d = e.X;
                h = d + 250;
                f = d + 100;
                c = GetC(h);
                c > -1 && c < n[1] && (oGd.$Crater[j + "_" + c] = 1, n[1] = c);
                h > 120 && h < n[2] && (n[2] = h, l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)", l.childNodes[1].style.left = Math.max(0, f) + "px");
                GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= .005);
                return m
            },
            ChkActs1: function(f, d, g, c) {
                var b, e;
                f.JudgeAttack();
                (f.AttackedLX += b = f.Speed) > oS.W ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (f.ZX = f.AttackedRX += b, f.Ele.style.left = Math.ceil(f.X += b) + "px", e = 1);
                return e
            },
            getPea: function(c, b) {
                PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
                c.getHit0(c, b)
            },
            getFirePea: function(c, b) {
                PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
                c.getHit0(c, b)
            },
            getSnowPea: function(c, b) {
                PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
                c.getHit0(c, b)
            },
            getFirePeaSputtering: function() {},
            getFreeze: function(c, b) {
                c.getHit0(c, 20)
            },
            getShadow: function(b) {
                return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px"
            },
            getHit: a,
            getHit0: a,
            getHit1: a,
            getHit2: a,
            getHit3: a,
            GoingDie: function() {
                var b = this;
                b.beAttacked = 0;
                b.AutoReduceHP(b.id)
            },
            NormalDie: function() {
                var b = this;
                PlayAudio("explosion");
                b.EleBody.src = b.PicArr[b.DieGif] + Math.random();
                oSym.addTask(70, ClearChild, [b.Ele]);
                b.HP = 0;
                delete $Z[b.id];
                b.JudgeIce();
                b.PZ && oP.MonPrgs()
            },
            DisappearDie: function() {
                var b = this;
                ClearChild(b.Ele);
                b.HP = 0;
                delete $Z[b.id];
                b.JudgeIce();
                b.PZ && oP.MonPrgs()
            },
            ExplosionDie: function() {
                var b = this;
                b.EleBody.src = b.PicArr[b.BoomDieGif] + Math.random();
                oSym.addTask(300, ClearChild, [b.Ele]);
                b.HP = 0;
                delete $Z[b.id];
                b.JudgeIce();
                b.PZ && oP.MonPrgs()
            },
            CrushDie: function() {
                this.NormalDie()
            },
            JudgeIce: function() {
                var d = this,
                    b = d.R,
                    e = $("dIceCar" + b),
                    c = oGd.$Ice[b];
                e && e.childNodes[1] && SetBlock(e.childNodes[1]);
                --c[0] <= 0 && oSym.addTask(3e3, function(k, h) {
                    var j = oGd.$Ice[h],
                        g, f = oGd.$Crater;
                    if (j && j[0] <= 0 && k) {
                        ClearChild(k);
                        g = j[1];
                        while (g < 11) {
                            delete f[h + "_" + g++];
                            delete oGd.$Ice[h]
                        }
                    }
                }, [e, b])
            },
            flatTire: function() {
                var b = this;
                b.EleBody.src = "images/Zombies/wall/Zomboni/4.gif";
                b.beAttacked = 0;
                b.HP = 0;
                b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {};
                b.ChkActs = b.ChkActs1 = function() {};
                oSym.addTask(290, function(e, c) {
                    var d = $Z[e];
                    d && d.NormalDie()
                }, [b.id, b.EleBody])
            },
            JudgeAttack: function() {
                var f = this,
                    c = f.ZX,
                    d = f.R + "_",
                    e = GetC(c),
                    g = oGd.$,
                    b;
                (b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1])
            },
            JudgeLR: function(e, c, d, b, f) {
                return d > 10 || d < 1 ? false : function() {
                    c += --d + "_";
                    var g = 3,
                        h;
                    while (g--) {
                        if (h = f[c + g]) {
                            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false
                        }
                    }
                }()
            },
            JudgeSR: function(e, c, d, b, f) {
                return d > 9 ? false : function() {
                    c += d + "_";
                    var g = 3,
                        h;
                    while (g--) {
                        if (h = f[c + g]) {
                            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false
                        }
                    }
                }()
            },
            NormalAttack: function(c, b) {
                var d = $Z[c];
                $P[b].getHurt(d, 2, d.Attack)
            },
            getThump: function() {
                this.NormalDie()
            }
        })
    }(),
    oDolphinRiderZombie = InheritO(oAquaticZombie, {
        EName: "oDolphinRiderZombie",
        CName: "海豚骑士僵尸",
        HP: 270,
        Lvl: 2,
        BreakPoint: 167,
        width: 282,
        height: 210,
        Lvl: 2,
        getShadow: function(a) {
            return "left:105px;top:175px"
        },
        GetDX: function() {
            return -137
        },
        GetDY: function() {
            return 0
        },
        GetDTop: 0,
        Altitude: 1,
        haveDolphin: 1,
        JumpTime: 45,
        beAttackedPointL: 110,
        beAttackedPointR: 190,
        SunNum: 350,
        OSpeed: 3.2,
        Speed: 3.2,
        PicArr: function() {
            var a = "images/Zombies/DolphinRiderZombie/";
            return ["images/Card/Zombies/DolphinRiderZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Jump2.gif" + $Random, a + "Walk3.gif", a + "Walk4.gif", a + "Die2.gif" + $Random, a + "Jump3.gif" + $Random]
        }(),
        AudioArr: ["dolphin_before_jumping", "dolphin_appears", "zombie_entering_water"],
        Produce: '海豚骑士僵尸善于利用你水池防御的弱点。<p>韧性：<font color="#FF0000">中</font><br>速度：<font color="#FF0000">快，慢（跳越后）</font><br>特点：<font color="#FF0000">跃过他所遇到的第一株植物</font><br>只在水池关卡出现</font></p>那海豚其实也是个僵尸。',
        BirthCallBack: function(a) {
            PlayAudio("dolphin_appears");
            oAquaticZombie.prototype.BirthCallBack(a)
        },
        Jump: function(a) {
            a.beAttacked && (PlayAudio("zombie_entering_water"), a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8] + Math.random(), oSym.addTask(240, function(d, b) {
                var c;
                $Z[d] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 1, b.OSpeed = b.Speed = 10.8, SetStyle(b.Ele, {
                    left: (c = b.X -= 140) + "px"
                }), b.AttackedLX = c + (b.beAttackedPointL = 185), b.AttackedRX = c + (b.beAttackedPointR = 265), b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2)
            }, [a.id, a]), a.ChkActs = function() {
                return 1
            })
        },
        ChkActsL1: function(d, c, e, b) {
            if (d.JumpTime <= 0) {
                d.Jump(d);
                return 1
            }
            var a;
            !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= a = d.Speed, LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
            return 1
        },
        getCrushed: function(a) {
            this.NormalAttack(this.id, a.id, a.AttackedLX);
            this.getCrushed = function() {
                return false
            };
            a.Stature > 0 && oSym.addTask(50, function(c) {
                var b = $Z[c];
                b && b.CrushDie()
            }, [this.id]);
            return false
        },
        getRaven: function(a) {
            return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0
        },
        JudgeAttack: function() {
            var f = this,
                b = f.ZX,
                d = f.R + "_",
                c = GetC(b),
                g = oGd.$,
                e, a;
            for (e = c - 2; e <= c; e++) {
                if (e > 9) {
                    continue
                }
                for (a = 2; a > -1;
                    (p = g[d + e + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= b && p.AttackedLX < b && (a = -1, f.JudgeAttack = CZombies.prototype.JudgeAttack, f.NormalAttack(f.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, f.JudgeAttack = CZombies.prototype.JudgeAttack, (f.NormalAttack = CZombies.prototype.NormalAttack)(f.id, p.id)))) {}
            }
        },
        AttackZombie2: function(c, b, a) {
            c.NormalAttack(b, a, $Z[a].AttackedLX)
        },
        NormalAttack: function(d, b, g) {
            var f = $Z[d],
                a = f.Ele,
                c = f.EleShadow,
                e = f.EleBody;
            e.src = f.PicArr[9] + Math.random();
            SetHidden(c);
            f.isAttacking = 1;
            f.Altitude = 2;
            f.haveDolphin = 0;
            PlayAudio("dolphin_before_jumping");
            f.getFreeze = function() {
                f.getSnow(f, 20, 0)
            };
            oSym.addTask(50, function(m, j, i, l, q) {
                var h = $Z[m],
                    k, r, s, n = function() {
                        q.src = h.PicArr[10];
                        h.isAttacking = 0;
                        h.Altitude = 1;
                        h.OSpeed = h.Speed = 1.6;
                        h.WalkGif0 = 11;
                        h.NormalGif = h.WalkGif1 = 10;
                        h.LostHeadGif = h.DieGif = 12;
                        h.NormalAttack = (s = CZombies.prototype).NormalAttack;
                        h.getCrushed = s.getCrushed;
                        h.getFreeze = s.getFreeze;
                        h.getRaven = s.getRaven;
                        h.AttackZombie2 = s.AttackZombie2
                    };
                h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = r = k.AttackedRX) - (h.beAttackedPointL = 45)) + (h.beAttackedPointR = 100), SetStyle(i, {
                    left: h.X + "px"
                }), h.EleShadow.style.left = "45px", n()) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - (h.beAttackedPointR = 100)) + (h.beAttackedPointL = 45), SetStyle(i, {
                    left: h.X + "px"
                }), h.EleShadow.style.left = "45px", q.src = h.PicArr[13] + Math.random(), oSym.addTask(170, function(t, w) {
                    var v = $Z[t],
                        u;
                    v && n()
                }, [m, q])))
            }, [d, b, a, c, e])
        },
        GoingDie: function() {
            var b = this,
                c = b.id,
                a = b.PicArr;
            b.EleBody.src = a[b.haveDolphin ? 7 : 12] + Math.random();
            b.GoingDieHead(c, a, b);
            b.beAttacked = 0;
            b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
            b.AutoReduceHP(c)
        }
    }),
    oCDolphinRiderZombie = InheritO(oDolphinRiderZombie, {}),
    oImp = InheritO(OrnNoneZombies, {
        EName: "oImp",
        CName: "小鬼僵尸",
        HP: 270,
        Lvl: 4,
        StandGif: 9,
        OSpeed: 1.4,
        Speed: 1.4,
        PicArr: function() {
            var a = "images/Zombies/Imp/";
            return ["images/Card/Zombies/Imp.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
        }(),
        Produce: '小鬼僵尸会快速突破你的防线。</p><p>韧性：<font color="#FF0000">低</font><br>其实小鬼僵尸天生就能跑的很快，一些懒惰的小鬼僵尸喜欢粘着巨人僵尸，但是一些勤奋的，就会经常出门成群的跑马拉松。'
    }),
    oJX = InheritO(OrnNoneZombies, {
        EName: "oJX",
        CName: "蟹将僵尸",
        HP: 275,
        Lvl: 4,
        StandGif: 9,
        OSpeed: 1.2,
        Speed: 1.4,
        Attack: 120,
        PicArr: function() {
            var a = "images/Zombies/JX/";
            return ["images/Card/Zombies/JX.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
        }(),
        Produce: '小鬼僵尸的亲戚，攻击似乎提升了不少。</p><p>韧性：<font color="#FF0000">中</font><br>矮小的他喜欢这副捡来的蟹壳，V字型的蟹钳更是让他感到兴奋，以至忘掉了身高上的劣势。'
    }),
    oJackinTheBoxZombie = InheritO(OrnNoneZombies, {
        EName: "oJackinTheBoxZombie",
        CName: "小丑僵尸",
        SunNum: 100,
        HP: 270,
        BreakPoint: 167,
        Lvl: 3,
        Status: 1,
        BookHandPosition: "30% 70%",
        width: 196,
        height: 181,
        beAttackedPointL: 120,
        beAttackedPointR: 170,
        StandGif: 5,
        NormalGif: 6,
        DieGif: 3,
        BoomDieGif: 4,
        HeadGif: 11,
        LostHeadGif: 9,
        LostHeadAttackGif: 10,
        AttackGif: 2,
        OSpeed: 3.6,
        Speed: 3.6,
        Produce: '这种僵尸带着个会爆炸的潘多拉盒子。</p><p>韧性：<font color="#FF0000">中</font><br>速度：<font color="#FF0000">快</font><br>特点：<font color="#FF0000">打开玩偶匣会爆炸</font><br>弱点：<font color="#FF0000">磁力菇</font><br>这种僵尸令人不寒而栗，不是因为他的冰冷身躯而是因为他的疯狂。',
        AudioArr: ["jackinthebox", "explosion"],
        PicArr: function() {
            var a = "images/Zombies/JackinTheBoxZombie/";
            return ["images/Card/Zombies/JackboxZombie.png", a + "0.gif", a + "Attack.gif", a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif", a + "Walk.gif", a + "OpenBox.gif", a + "Boom.gif" + $Random, a + "LostHead.gif", a + "LostHeadAttack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random]
        }(),
        RandomOpenBox: function(a) {
            oSym.addTask(Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301), function(c) {
                var b = $Z[c];
                b && b.beAttacked && b.OpenBox(c)
            }, [a])
        },
        OpenBox: function(b) {
            var a = $Z[b];
            a.EleBody.src = a.PicArr[7];
            a.ChkActs = a.ChkActs1 = function() {
                return 1
            };
            a.JudgeAttack = function() {
                var g = this,
                    d = g.ZX,
                    e = g.R + "_",
                    f = GetC(d),
                    h = oGd.$,
                    c;
                (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0)
            };
            a.JudgeAttackH = function() {
                var e = this,
                    d = oZ.getZ0(e.ZX, e.R),
                    f = e.id,
                    c;
                d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1) : e.isAttacking && (e.isAttacking = 0)
            };
            a.getPea = a.getSnowPea = a.getFirePeaSputtering = a.getFirePea = a.getHit = a.getHit0 = a.getHit1 = a.getHit2 = a.getHit3 = a.ChangeR = a.bedevil = function() {};
            oSym.addTask(50, function(c) {
                $Z[c] && (a.Status = 0, !--oGd.$JackinTheBox && StopAudio("jackinthebox"), PlayAudio("jackinthebox"), oSym.addTask(90, function(f) {
                    var e = $Z[f],
                        d;
                    e && (d = NewImg("", "", "width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20"), PlayAudio("explosion"), d.src = e.PicArr[8] + Math.random(), EDPZ.appendChild(d), oSym.addTask(70, ClearChild, [d]), e.PZ ? function(k, g) {
                        var q = Math.max(1, k - 1),
                            o = Math.min(oS.R, k + 1),
                            n = Math.max(1, g - 1),
                            h = Math.min(oS.C, g + 1),
                            r = oGd.$,
                            l, j = "",
                            m;
                        do {
                            g = n;
                            do {
                                j = q + "_" + g + "_";
                                for (l = 0; l < 4; l++) {
                                    (m = r[j + l]) && m.BoomDie()
                                }
                            } while (g++ < h)
                        } while (q++ < o)
                    }(e.R, GetC(e.ZX)) : function(j, l) {
                        var m = j - 120,
                            o = j + 120,
                            h = Math.min(1, l - 1),
                            g = Math.max(oS.R, l + 1),
                            n, k;
                        do {
                            k = (n = oZ.getArZ(m, o, h)).length;
                            while (k--) {
                                n[k].ExplosionDie()
                            }
                        } while (h++ < g)
                    }(e.ZX, e.R), e.DisappearDie())
                }, [c]))
            }, [b])
        },
        getShadow: function(a) {
            return "left:" + (a.beAttackedPointL - 8) + "px;top:" + (a.height - 32) + "px"
        },
        BirthCallBack: function(d) {
            var c = d.delayT,
                b = d.id,
                a = d.Ele = $(b);
            d.EleShadow = a.firstChild;
            d.EleBody = a.childNodes[1];
            c ? oSym.addTask(c, function(f, e) {
                var g = $Z[f];
                g && (PlayAudio("jackinthebox", true), ++oGd.$JackinTheBox, g.FreeSetbodyTime = 0, SetBlock(e), g.RandomOpenBox(f))
            }, [b, a]) : (PlayAudio("jackinthebox", true), ++oGd.$JackinTheBox, SetBlock(a), d.RandomOpenBox(b))
        },
        NormalDie: function() {
            var a = this;
            a.Status && !--oGd.$JackinTheBox && StopAudio("jackinthebox");
            a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
            oSym.addTask(250, ClearChild, [a.Ele]);
            a.HP = 0;
            delete $Z[a.id];
            a.PZ && oP.MonPrgs()
        },
        ExplosionDie: function() {
            var a = this;
            a.Status && !--oGd.$JackinTheBox && StopAudio("jackinthebox");
            a.EleBody.src = a.PicArr[a.BoomDieGif] + Math.random();
            oSym.addTask(300, ClearChild, [a.Ele]);
            a.HP = 0;
            delete $Z[a.id];
            a.PZ && oP.MonPrgs()
        },
        DisappearDie: function() {
            this.Status && !--oGd.$JackinTheBox && StopAudio("jackinthebox");
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        CrushDie: function() {
            var a = this;
            a.Status && !--oGd.$JackinTheBox && StopAudio("jackinthebox");
            a.GoingDieHead(a.id, a.PicArr, a);
            ClearChild(a.Ele);
            a.HP = 0;
            delete $Z[a.id];
            a.PZ && oP.MonPrgs()
        }
    }),
    oCJackinTheBoxZombie = InheritO(oJackinTheBoxZombie, {
        EName: "oCJackinTheBoxZombie"
    });
oBalloonZombie = InheritO(OrnIZombies, {
    EName: "oBalloonZombie",
    CName: "气球僵尸",
    OrnHP: 10,
    StandGif: 2,
    CardGif: 0,
    SunNum: 100,
    width: 207,
    height: 197,
    beAttackedPointL: 30,
    beAttackedPointR: 85,
    OSpeed: 3.2,
    Speed: 3.2,
    Altitude: 3,
    OrnLostNormalGif: 9,
    OrnLostAttackGif: 3,
    getShadow: function(c) {
        return "left:" + (c.beAttackedPointL - 0) + "px;top:" + (c.height - 22) + "px"
    },
    AudioArr: ["ballooninflate", "balloon_pop"],
    BookHandPosition: "80% 80%",
    PicArr: function() {
        var a = "images/Zombies/BalloonZombie/";
        return ["images/Card/Zombies/Balloonzombie.png", a + "0.gif", a + "1.gif", a + "Attack.gif", a + "Walk2.gif", a + "Attack2.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif", a + "Walk.gif", a + "Drop.gif", a + "Boom2.gif", a + "BalloonZombie.gif"]
    }(),
    Produce: '气球僵尸漂浮在空中，躲过大多数攻击。<p>韧性：<font color="#FF0000">低</font><br>特点：<font color="#FF0000">飞行</font><br>弱点：<font color="#FF0000">仙人掌和三叶草</font></p>气球僵尸真幸运。气球有很多功效，而其他僵尸都不曾捡到过。',
    GetDX: function() {
        return -10
    },
    BirthCallBack: function(e) {
        var d = e.delayT,
            c = e.id,
            a = e.Ele = $(c),
            f = oGd.$Balloon,
            b = e.R;
        e.EleShadow = a.firstChild;
        e.EleBody = a.childNodes[1];
        d ? oSym.addTask(d, function(i, g) {
            var j = $Z[i],
                k = oGd.$Balloon,
                h = j.R;
            j && (j.FreeSetbodyTime = 0, SetBlock(g));
            k[h] == undefined ? k[h] = 1 : ++k[h];
            PlayAudio("ballooninflate")
        }, [c, a]) : (SetBlock(a), f[b] == undefined ? f[b] = 1 : ++f[b], PlayAudio("ballooninflate"))
    },
    ChkActs: function(f, d, g, c) {
        var b, a, e;
        !(f.FreeFreezeTime || f.FreeSetbodyTime) ? (a = f.AttackedRX -= b = f.Speed) < -50 ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (a < 100 && !f.PointZombie && (f.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), f.ChangeR({
            R: d,
            ar: [oS.R - 1],
            CustomTop: 400 - f.height + f.GetDY()
        })), f.ZX = f.AttackedLX -= b, f.Ele.style.left = Math.floor(f.X -= b) + "px", e = 1): e = 1;
        return e
    },
    Drop: function() {
        var a = this;
        PlayAudio("balloon_pop");
        a.EleBody.src = "images/Zombies/BalloonZombie/Drop.gif" + $Random + Math.random();
        a.ChkActs = function() {
            return 1
        };
        a.Altitude = 4;
        --oGd.$Balloon[a.R];
        oSym.addTask(120, function(b) {
            var c = $Z[b];
            if (c) {
                c.BoomDieGif = 11;
                c.Altitude = 1;
                c.OSpeed = c.Speed = 1.6;
                c.getFreeze = OrnIZombies.prototype.getFreeze;
                c.EleBody.src = "images/Zombies/BalloonZombie/Walk.gif";
                c.ChkActs = OrnIZombies.prototype.ChkActs;
                c.ExplosionDie = function() {
                    var d = this;
                    d.EleBody.src = d.PicArr[d.BoomDieGif];
                    oSym.addTask(200, ClearChild, [d.Ele]);
                    d.HP = 0;
                    delete $Z[d.id];
                    d.PZ && oP.MonPrgs()
                };
                c.DisappearDie = function() {
                    ClearChild(this.Ele);
                    this.HP = 0;
                    delete $Z[this.id];
                    this.PZ && oP.MonPrgs()
                };
                c.CrushDie = function() {
                    var d = this;
                    d.GoingDieHead(d.id, d.PicArr, d);
                    ClearChild(d.Ele);
                    d.HP = 0;
                    delete $Z[d.id];
                    d.PZ && oP.MonPrgs()
                }
            }
        }, [a.id])
    },
    getFreeze: function(b, a) {
        b.Attack = 50;
        b.Speed = .5 * b.OSpeed;
        oSym.addTask(1500, function(d, c) {
            var e = $Z[d];
            e && e.FreeSlowTime == c && (e.FreeSlowTime = 0, e.Attack = 100, e.Speed = e.OSpeed)
        }, [a, b.FreeSlowTime = oSym.Now + 1500])
    },
    NormalDie: function() {
        var a = this;
        a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
        oSym.addTask(250, ClearChild, [a.Ele]);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs()
    },
    ExplosionDie: function() {
        var a = this;
        a.EleBody.src = a.PicArr[a.BoomDieGif];
        oSym.addTask(200, ClearChild, [a.Ele]);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs();
        --oGd.$Balloon[a.R]
    },
    DisappearDie: function() {
        ClearChild(this.Ele);
        this.HP = 0;
        delete $Z[this.id];
        this.PZ && oP.MonPrgs();
        --oGd.$Balloon[this.R]
    },
    CrushDie: function() {
        this.DisappearDie()
    }
}), oJY = InheritO(oBalloonZombie, {
    EName: "oJY",
    CName: "贱鱼僵尸",
    OrnHP: 1,
    HP: 1,
    PicArr: function() {
        var a = "images/Zombies/JY/";
        return ["images/Card/Zombies/JY.png", a + "0.gif", a + "1.gif", a + "Attack.gif", a + "Walk2.gif", a + "Attack2.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif", a + "Walk.gif", a + "Drop.gif", a + "Boom2.gif", a + "BalloonZombie.gif"]
    }(),
    Produce: '贱鱼僵尸利用鱼形飞行器，躲过了陆地上的攻击。<p>速度：<font color="#FF0000">快</font><br>特点：<font color="#FF0000">飞行</font><br>弱点：<font color="#FF0000">仙人掌</font></p>曾经站在巨人肩膀上的他也想要体验做巨人的感觉，他把鱼形飞行器系在背上，可让他万万没想到，这玩意居然让自己飞了起来！',
    GetDX: function() {
        return -10
    },
    BirthCallBack: function(e) {
        var d = e.delayT,
            c = e.id,
            a = e.Ele = $(c),
            f = oGd.$Balloon,
            b = e.R;
        e.EleShadow = a.firstChild;
        e.EleBody = a.childNodes[1];
        d ? oSym.addTask(d, function(i, g) {
            var j = $Z[i],
                k = oGd.$Balloon,
                h = j.R;
            j && (j.FreeSetbodyTime = 0, SetBlock(g));
            k[h] == undefined ? k[h] = 1 : ++k[h];
            PlayAudio("ballooninflate")
        }, [c, a]) : (SetBlock(a), f[b] == undefined ? f[b] = 1 : ++f[b], PlayAudio("ballooninflate"))
    },
    ChkActs: function(f, d, g, c) {
        var b, a, e;
        !(f.FreeFreezeTime || f.FreeSetbodyTime) ? (a = f.AttackedRX -= b = f.Speed) < -50 ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (a < 100 && !f.PointZombie && (f.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), f.ChangeR({
            R: d,
            ar: [oS.R - 1],
            CustomTop: 400 - f.height + f.GetDY()
        })), f.ZX = f.AttackedLX -= b, f.Ele.style.left = Math.floor(f.X -= b) + "px", e = 1): e = 1;
        return e
    },
    Drop: function() {
        var a = this;
        PlayAudio("balloon_pop");
        a.EleBody.src = "images/Zombies/JY/Drop.gif" + $Random + Math.random();
        a.ChkActs = function() {
            return 1
        };
        a.Altitude = 4;
        --oGd.$Balloon[a.R];
        oSym.addTask(120, function(b) {
            var c = $Z[b];
            if (c) {
                c.BoomDieGif = 11;
                c.Altitude = 1;
                c.OSpeed = c.Speed = 1.6;
                c.getFreeze = OrnIZombies.prototype.getFreeze;
                c.EleBody.src = "images/Zombies/JY/Walk.gif";
                c.ChkActs = OrnIZombies.prototype.ChkActs;
                c.ExplosionDie = function() {
                    var d = this;
                    d.EleBody.src = d.PicArr[d.BoomDieGif];
                    oSym.addTask(200, ClearChild, [d.Ele]);
                    d.HP = 0;
                    delete $Z[d.id];
                    d.PZ && oP.MonPrgs()
                };
                c.DisappearDie = function() {
                    ClearChild(this.Ele);
                    this.HP = 0;
                    delete $Z[this.id];
                    this.PZ && oP.MonPrgs()
                };
                c.CrushDie = function() {
                    var d = this;
                    d.GoingDieHead(d.id, d.PicArr, d);
                    ClearChild(d.Ele);
                    d.HP = 0;
                    delete $Z[d.id];
                    d.PZ && oP.MonPrgs()
                }
            }
        }, [a.id])
    },
    getFreeze: function(b, a) {
        b.Attack = 50;
        b.Speed = .5 * b.OSpeed;
        oSym.addTask(1500, function(d, c) {
            var e = $Z[d];
            e && e.FreeSlowTime == c && (e.FreeSlowTime = 0, e.Attack = 100, e.Speed = e.OSpeed)
        }, [a, b.FreeSlowTime = oSym.Now + 1500])
    },
    NormalDie: function() {
        var a = this;
        a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
        oSym.addTask(250, ClearChild, [a.Ele]);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs()
    },
    ExplosionDie: function() {
        var a = this;
        a.EleBody.src = a.PicArr[a.BoomDieGif];
        oSym.addTask(200, ClearChild, [a.Ele]);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs();
        --oGd.$Balloon[a.R]
    },
    DisappearDie: function() {
        ClearChild(this.Ele);
        this.HP = 0;
        delete $Z[this.id];
        this.PZ && oP.MonPrgs();
        --oGd.$Balloon[this.R]
    },
    CrushDie: function() {
        this.DisappearDie()
    }
}), oCZombie = InheritO(OrnNoneZombies, {
    EName: "oCZombie",
    CName: "庶民僵尸",
    StandGif: 9,
    PicArr: function() {
        var a = "images/Zombies/wall/Zombie/";
        return ["images/Card/Zombies/CZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
    }(),
    Produce: '身着古装的僵尸。<p>韧性：<font color="#FF0000">低</font></p>这样的庶民气质是不是让你想到了普通僵尸？是的，他是普通僵尸在中国的远房表亲。这一族都是忠实的脑髓追求者。'
}), oCZombie2 = InheritO(oCZombie, {
    EName: "oCZombie2"
}, {
    PicArr: {
        2: "images/Zombies/wall/Zombie/Zombie.gif",
        9: "images/Zombies/wall/Zombie/1.gif"
    }
}), oCZombie3 = InheritO(oCZombie, {
    EName: "oCZombie3"
}, {
    PicArr: {
        2: "images/Zombies/wall/Zombie/Zombie.gif",
        9: "images/Zombies/wall/Zombie/1.gif"
    }
});
oCConeheadZombie = InheritO(OrnIZombies, {
    EName: "oCConeheadZombie",
    CName: "竹篓僵尸",
    OrnHP: 370,
    Lvl: 2,
    SunNum: 75,
    StandGif: 11,
    PicArr: function() {
        var b = "images/Zombies/wall/ConeheadZombie/",
            a = "images/Zombies/wall/Zombie/";
        return ["images/Card/Zombies/CConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"]
    }(),
    AudioArr: ["plastichit"],
    PlayNormalballAudio: function() {
        PlayAudio("plastichit")
    },
    Produce: '他的竹篓头盔使他更能经受来自植物的打击<p>韧性：<font color="#FF0000">携带一般防具</font></p>竹篓僵尸是个持家的好父亲，他最大的爱好就是追着别人询问哪里可以买到特价的脑子。'
});
oCBucketheadZombie = InheritO(oCConeheadZombie, {
    EName: "oCBucketheadZombie",
    CName: "乞丐僵尸",
    OrnHP: 1100,
    Lvl: 3,
    SunNum: 125,
    PlayNormalballAudio: function() {
        PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)])
    },
    Produce: '他的瓷碗能有效抵挡弹丸的冲击<p>韧性：<font color="#FF0000">携带坚固防具</font></p>僵尸们都不忍心把乞丐僵尸送上战场，他们害怕听到“碎了一个，碎了两个…”。'
}, {
    PicArr: {
        0: "images/Card/Zombies/CBucketheadZombie.png",
        1: "images/Zombies/wall/BucketheadZombie/0.gif",
        2: "images/Zombies/wall/BucketheadZombie/BucketheadZombie.gif",
        3: "images/Zombies/wall/BucketheadZombie/BucketheadZombieAttack.gif",
        9: "images/Zombies/wall/Zombie/Zombie.gif",
        11: "images/Zombies/wall/BucketheadZombie/1.gif"
    }
});
othugZombie = InheritO(OrnNoneZombies, {
    EName: "othugZombie",
    CName: "刺客僵尸",
    HP: 550,
    width: 348,
    height: 218,
    OSpeed: 1.5,
    Speed: 1.5,
    beAttackedPointL: 215,
    beAttackedPointR: 260,
    StandGif: 13,
    GetDX: function() {
        return -238
    },
    GetDY: function() {
        return 2
    },
    Lvl: 2,
    SunNum: 75,
    PicArr: function() {
        var a = "images/Zombies/wall/thugZombie/";
        return ["images/Card/Zombies/thugZombie.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, "images/Zombies/PoleVaultingZombie/BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"]
    }(),
    Produce: '刺客僵尸出其不意地突破你的阵型<p>韧性：<font color="#FF0000">高</font></p>刺客，生前经受着残酷的训练；死后，他们虽然已经忘记了刺杀的使命，但是反复训练过的轻功奇术却还熟记于心，当然还有那忘不了的美味脑子。',
    getShadow: function(a) {
        return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px"
    },
    GoingDieHead: function(c, a, b) {
        oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
    },
    JudgeAttack: function() {
        var g = this,
            b = g.ZX,
            d = g.R + "_",
            c = GetC(b),
            h = oGd.$,
            f, a, e = b - 74;
        for (f = c - 2; f <= c; f++) {
            if (f > 9) {
                continue
            }
            for (a = 2; a > -1;
                (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
        }
    },
    getCrushed: function(a) {
        this.NormalAttack(this.id, a.id, a.AttackedLX);
        this.getCrushed = function() {
            return false
        };
        a.Stature > 0 && oSym.addTask(50, function(c) {
            var b = $Z[c];
            b && b.CrushDie()
        }, [this.id]);
        return false
    },
    getRaven: function(a) {
        return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0
    },
    NormalAttack: function(d, b, g) {
        var f = $Z[d],
            a = f.Ele,
            c = f.EleShadow,
            e = f.EleBody;
        e.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
        SetHidden(c);
        f.isAttacking = 2;
        f.Altitude = 2;
        f.getFreeze = function() {
            f.getSnowPea(f, 20)
        };
        oSym.addTask(50, function(h) {
            $Z[h] && PlayAudio("polevault")
        }, [d]);
        oSym.addTask(100, function(m, j, i, l, n) {
            var h = $Z[m],
                k, q, r;
            h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
                left: h.X + "px"
            }), n.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
                left: h.X + "px"
            }), n.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(80, function(s, v) {
                var u = $Z[s],
                    t;
                u && (v.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.2, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven)
            }, [m, n])))
        }, [d, b, a, c, e])
    }
}), oEunZombie = InheritO(OrnIIZombies, {
    EName: "oEunZombie",
    CName: "灵符僵尸",
    OrnHP: 500,
    HP: 270,
    Lvl: 2,
    LostPaperGif: 13,
    StandGif: 14,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    Speed: 1.5,
    LostPaperSpeed: 1.5,
    PicArr: function() {
        var a = "images/Zombies/wall/EunZombie/";
        return ["images/Card/Zombies/EunZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/NewspaperZombie/BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"]
    }(),
    Produce: '同样是尸变，这位老兄不大一样<p>韧性：<font color="#FF0000">高</font><br>特点：<font color="#FF0000">灵符被打掉后会进入爆发状态</font></p>灵符僵尸生前官至一品，所以尽管他已经不能好好走路了，他还是时刻提醒自己：穿好袍子、戴好顶戴…。',
    getShadow: function(a) {
        return "left:75px;top:" + (a.height - 25) + "px"
    },
    GoingDie: function(b) {
        var a = this,
            c = a.id;
        a.EleBody.src = b;
        oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
        a.beAttacked = 0;
        a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
        a.AutoReduceHP(c)
    },
    getHurtOrnLost: function(j, a, g, m, c, l, k, i) {
        var e = this;
        if (!e.beAttacked) {
            k && e.DisappearDie();
            return
        }
        var b = e.id,
            h = e.HP,
            d = e.PicArr,
            f = e.isAttacking;
        switch (true) {
            case (h -= g) < 1:
                e.HP = 0;
                e.NormalDie();
                return;
            case h < 91:
                e.HP = h;
                e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
                return
        }
        e.HP = h;
        switch (m) {
            case -1:
                e.getSlow(e, b, 1e3);
                break;
            case 1:
                e.getFireball(e, b, a);
                break;
            default:
                !i && j == -1 && e.PlayNormalballAudio()
        }
        SetAlpha(e.EleBody, 50, .5);
        oSym.addTask(10, function(q) {
            var n = $Z[q];
            n && SetAlpha(n.EleBody, 100, 1)
        }, [b])
    },
    getSnowPea: function(c, a, b) {
        PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
        c.getHit0(c, a, b)
    },
    getFirePea: function(f, b, e) {
        f.PlayFireballAudio();
        (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
        f.Attack = 110;
        var d = f.AttackedLX,
            g = f.AttackedRX,
            a = oZ.getArZ(d, d + 40, f.R),
            c = a.length,
            h;
        while (c--) {
            (h = a[c]) != this && h.getFirePeaSputtering()
        }(f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function() {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, .5), oSym.addTask(10, function(j, i) {
            (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1)
        }, [f.id]))
    },
    getHit0: function(c, a, b) {
        b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, .5), oSym.addTask(10, function(e, d) {
            (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
    },
    getHit1: function(b, a) {
        (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, .5), oSym.addTask(10, function(d, c) {
            (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
        }, [b.id]))
    },
    getHit2: function(b, a) {
        (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.SetAlpha(b, b.EleBody, 50, .5), oSym.addTask(10, function(d, c) {
            (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
        }, [b.id]))
    },
    getHit3: function(b, a) {
        (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, .5), oSym.addTask(10, function(d, c) {
            (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
        }, [b.id]))
    },
    CheckOrnHP: function(g, h, d, c, f, b, a) {
        var e = OrnNoneZombies.prototype;
        (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function() {
            return 1
        }, g.ChkActs1 = function() {
            return 1
        }, g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function(m, l) {
            var k = $Z[m];
            if (!k) {
                return
            }
            var j = CZombies.prototype,
                i = k.OSpeed = k.LostPaperSpeed;
            k.ChkActs = j.ChkActs;
            k.ChkActs1 = j.ChkActs1;
            k.Speed && (k.Speed = !k.FreeSlowTime ? i : .5 * i);
            if (!k.beAttacked) {
                return
            }
            PlayAudio("newspaper_rarrgh2");
            k.EleBody.src = l;
            k.JudgeAttack()
        }, [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]))
    }
});
oZZ = InheritO(OrnNoneZombies, {
    EName: "oZZ",
    CName: "怨灵僵尸",
    Lvl: 4,
    HP: 500,
    StandGif: 9,
    OSpeed: 1.5,
    Speed: 1.5,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    getShadow: function(a) {
        return "display:none"
    },
    PicArr: function() {
        var a = "images/Zombies/wall/ZZ/";
        return ["images/Card/Zombies/ZZ.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/NewspaperZombie/BoomDie.gif" + $Random, a + "1.gif"]
    }(),
    Produce: '怨灵僵尸神出鬼没，很多时候，她甚至是隐形的。<p>韧性：<font color="#FF0000">中</font><br>特点：<font color="#FF0000">有可能抵消子弹攻击</font></p>有些鬼魂设法被超度，去不了天堂，只能在人间恶作剧。自从僵尸出现后，怨灵也兴奋了起来，如同找到了自家人。不过她还是像以前一样怕光。'
}), oEmperor = InheritO(oCZombie, {
    EName: "oEmperor",
    CName: "秦始皇僵尸",
    HP: 15e3,
    width: 464,
    height: 364,
    beAttackedPointL: 140,
    beAttackedPointR: 290,
    OSpeed: 1,
    Speed: 1,
    Attack: 3600,
    PlayNormalballAudio: function() {
        PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)])
    },
    PicArr: function() {
        var a = "images/Zombies/wall/Emperor/";
        return ["images/Card/Zombies/Emperor.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", "images/Zombies/Imp/ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
    }(),
    Produce: '秦始皇僵尸好霸气，还威风，有木有？<p>韧性：<font color="#FF0000">非常高</font><br>速度：<font color="#FF0000">慢</font></p>秦始皇做梦都想长生不老！自从变成僵尸，一日三餐吃脑子，果然长生不老！每天在无尽的长城中，追寻脑子......'
}), oWJY = InheritO(oEunZombie, {
    EName: "oWJY",
    CName: "作者僵尸",
    HP: 17e3,
    OrnHP: 1e4,
    lvl: 8,
    OSpeed: .3,
    Speed: .3,
    Attack: 550,
    LostPaperSpeed: 1.5,
    PicArr: function() {
        var a = "images/Zombies/WJY/";
        return ["images/Card/Zombies/WJY.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"]
    }(),
    Produce: '新一代僵王博士登场。<p>体力：<font color="#FF0000">不死之身</font></p>喂！你怎么会在出现在游戏里？我总会听到有玩家这么问。嗯，这都要怪一个叫严启伦的家伙。'
});
oWJY1 = InheritO(oDuckyTubeZombie1, {
    EName: "oWJY1",
    CName: "作者僵尸-水",
    OSpeed: .1,
    Speed: .1,
    HP: 2e4,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    getShadow: function(a) {
        return "display:none"
    },
    PicArr: function() {
        var a = "images/Zombies/WJY/water/";
        return ["images/Card/Zombies/DuckyTubeZombie1.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "ZombieHead.gif" + $Random, a + "Die.gif" + $Random]
    }(),
    AudioArr: ["zombie_entering_water"]
}), oXBZombie = InheritO(OrnNoneZombies, {
    EName: "oXBZombie",
    CName: "虾兵僵尸",
    Lvl: 4,
    StandGif: 9,
    OSpeed: 3.2,
    Speed: 3.2,
    PicArr: function() {
        var a = "images/Zombies/XB/";
        return ["images/Card/Zombies/XB.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
    }(),
    Produce: '流线型的虾头为他带来了比其他僵尸快一倍的速度。<p>韧性：<font color="#FF0000">低</font><br>弱点：<font color="#FF0000">寒冰射手</font></p>长期漂浮在海底令他产生了自己在飞的错觉，他坚信把虾戴在头上可以令自己飞得更高更远。'
}), oCXZombie = InheritO(oZombie, {
    EName: "oCXZombie",
    CName: "龟丞相僵尸",
    Lvl: 4,
    HP: 1300,
    OSpeed: .5,
    Speed: .5,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    PicArr: function() {
        var a = "images/Zombies/CX/";
        return ["images/Card/Zombies/CX.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/NewspaperZombie/BoomDie.gif" + $Random, a + "1.gif"]
    }(),
    Produce: '他坚硬的龟壳能减小大部分伤害。<p>韧性：<font color="#FF0000">很高</font><br>弱点：<font color="#FF0000">海星果</font></p>为了爬进与自己身形不符的龟壳，他不惜舍弃作为僵尸的尊严，最终在第一百次尝试之后成功把自己挤进了龟壳，再也出不来啦。'
}), oLGBOSS = function() {
    var a = function(d, b) {
        var c = d.HP;
        switch (true) {
            case (d.HP = c -= b) < 1e3:
                d.GoingDie();
                d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function() {};
                return;
            case c < 3e3:
                d.EleBody.src = "images/Zombies/LGBOSS/3.gif";
                break;
            case c < 5e3:
                d.EleBody.src = "images/Zombies/LGBOSS/2.gif"
        }
        d.SetAlpha(d, d.EleBody, 50, .5);
        oSym.addTask(10, function(f, e) {
            (e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1)
        }, [d.id])
    };
    return InheritO(oZomboni, {
        EName: "oLGBOSS",
        CName: "东海龙王",
        HP: 6e3,
        width: 464,
        height: 377,
        beAttackedPointL: 140,
        beAttackedPointR: 300,
        Produce: '东海龙王拥有无限延长的身躯，带领僵尸大军突破你的阵型。<p>韧性：<font color="#FF0000">不死之身</font><br>技能：<font color="#FF0000">无限身躯，碾压植物</font></p>僵王博士所研制的新一代水下作战机器。博士花了近一年的功夫，从龙王的排水系统到每一个菱角，都进行了细致的打磨加强。此刻这位僵尸天才正沉浸于机器完成的喜悦中。',
        PicArr: function() {
            var b = "images/Zombies/LGBOSS/";
            return ["images/Card/Zombies/LGBOSS.png", b + "0.gif", b + "1.gif", b + "2.gif", b + "3.gif", b + "5.gif" + $Random, b + "BoomDie.gif" + $Random, b + "ice.png", b + "ice_cap.png"]
        }(),
        AudioArr: ["zamboni", "explosion"],
        BirthCallBack: function(h) {
            var g = h.delayT,
                e = h.id,
                c = h.Ele = $(e),
                d = h.R,
                f, b = oGd.$Ice;
            h.EleShadow = c.firstChild;
            h.EleBody = c.childNodes[1];
            !b[d] ? (f = NewEle("dIceCar" + d, "div", "position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:205px", 0, EDPZ), NewImg("", "images/interface/blank.png", "position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:205px;left:0px;background:url(images/Zombies/LGBOSS/ice.png) repeat-x", f), NewImg("", "images/Zombies/LGBOSS/ice_cap.png", "position:absolute;display:none;left:0", f), b[d] = [1, 11, h.AttackedLX]) : ++b[d][0];
            g ? oSym.addTask(g, function(j, i) {
                var k = $Z[j];
                k && (k.FreeSetbodyTime = 0, SetBlock(i), PlayAudio("zamboni"))
            }, [e, c]) : (SetBlock(c), PlayAudio("zamboni"))
        },
        ChkActs: function(e, j, q, k) {
            var b, r, m, g, n = oGd.$Ice[j],
                d, h, f, c, l = $("dIceCar" + j);
            e.JudgeAttack();
            (r = e.AttackedRX -= b = e.Speed) < -50 ? (q.splice(k, 1), e.DisappearDie(), m = 0) : (r < 100 && !e.PointZombie && (e.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), e.ChangeR({
                R: j,
                ar: [oS.R - 1],
                CustomTop: 400 - e.height + e.GetDY()
            })), e.ZX = e.AttackedLX -= b, e.Ele.style.left = Math.floor(e.X -= b) + "px", m = 1);
            d = e.X;
            h = d + 250;
            f = d + 100;
            c = GetC(h);
            c > -1 && c < n[1] && (oGd.$Crater[j + "_" + c] = 1, n[1] = c);
            h > 120 && h < n[2] && (n[2] = h, l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)", l.childNodes[1].style.left = Math.max(0, f) + "px");
            GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= .005);
            return m
        },
        ChkActs1: function(f, d, g, c) {
            var b, e;
            f.JudgeAttack();
            (f.AttackedLX += b = f.Speed) > oS.W ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (f.ZX = f.AttackedRX += b, f.Ele.style.left = Math.ceil(f.X += b) + "px", e = 1);
            return e
        },
        getPea: function(c, b) {
            PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
            c.getHit0(c, b)
        },
        getFirePea: function(c, b) {
            PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
            c.getHit0(c, b)
        },
        getSnowPea: function(c, b) {
            PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
            c.getHit0(c, b)
        },
        getFirePeaSputtering: function() {},
        getFreeze: function(c, b) {
            c.getHit0(c, 20)
        },
        getShadow: function(b) {
            return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px"
        },
        getHit: a,
        getHit0: a,
        getHit1: a,
        getHit2: a,
        getHit3: a,
        GoingDie: function() {
            var b = this;
            b.beAttacked = 0;
            b.AutoReduceHP(b.id)
        },
        NormalDie: function() {
            var b = this;
            PlayAudio("explosion");
            b.EleBody.src = b.PicArr[b.DieGif] + Math.random();
            oSym.addTask(70, ClearChild, [b.Ele]);
            b.HP = 0;
            delete $Z[b.id];
            b.JudgeIce();
            b.PZ && oP.MonPrgs()
        },
        DisappearDie: function() {
            var b = this;
            ClearChild(b.Ele);
            b.HP = 0;
            delete $Z[b.id];
            b.JudgeIce();
            b.PZ && oP.MonPrgs()
        },
        ExplosionDie: function() {
            var b = this;
            b.EleBody.src = b.PicArr[b.BoomDieGif] + Math.random();
            oSym.addTask(300, ClearChild, [b.Ele]);
            b.HP = 0;
            delete $Z[b.id];
            b.JudgeIce();
            b.PZ && oP.MonPrgs()
        },
        CrushDie: function() {
            this.NormalDie()
        },
        JudgeIce: function() {
            var d = this,
                b = d.R,
                e = $("dIceCar" + b),
                c = oGd.$Ice[b];
            e && e.childNodes[1] && SetBlock(e.childNodes[1]);
            --c[0] <= 0 && oSym.addTask(3e3, function(k, h) {
                var j = oGd.$Ice[h],
                    g, f = oGd.$Crater;
                if (j && j[0] <= 0 && k) {
                    ClearChild(k);
                    g = j[1];
                    while (g < 11) {
                        delete f[h + "_" + g++];
                        delete oGd.$Ice[h]
                    }
                }
            }, [e, b])
        },
        flatTire: function() {
            var b = this;
            b.EleBody.src = "images/Zombies/LGBOSS/5.gif";
            b.beAttacked = 0;
            b.HP = 0;
            b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {};
            b.ChkActs = b.ChkActs1 = function() {};
            oSym.addTask(290, function(e, c) {
                var d = $Z[e];
                d && d.NormalDie()
            }, [b.id, b.EleBody])
        },
        JudgeAttack: function() {
            var f = this,
                c = f.ZX,
                d = f.R + "_",
                e = GetC(c),
                g = oGd.$,
                b;
            (b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1])
        },
        JudgeLR: function(e, c, d, b, f) {
            return d > 10 || d < 1 ? false : function() {
                c += --d + "_";
                var g = 3,
                    h;
                while (g--) {
                    if (h = f[c + g]) {
                        return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false
                    }
                }
            }()
        },
        JudgeSR: function(e, c, d, b, f) {
            return d > 9 ? false : function() {
                c += d + "_";
                var g = 3,
                    h;
                while (g--) {
                    if (h = f[c + g]) {
                        return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false
                    }
                }
            }()
        },
        NormalAttack: function(c, b) {
            var d = $Z[c];
            $P[b].getHurt(d, 2, d.Attack)
        },
        getThump: function() {
            this.NormalDie()
        }
    })
}();
