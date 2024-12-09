const Elements = {
    DateElement: document.querySelector(".Date"),
    ClockElement: document.querySelector(".Clock"),
    ThemeElement: document.querySelector(".Theme"),
    ModeElement: document.querySelector(".Mode"),
    UpdateLabel: document.querySelector(".AnnualUpdateLabel"),
    TimerButton: document.querySelector(".TimerStartStopButton"),
    TimerSetup: document.querySelector(".TimerSetup"),
};

const ClockModes = {
    Analog: document.querySelector(".AnalogClock"),
    Digital: document.querySelector(".DigitalClock")
};

const AnalogHands = {
    Second: document.querySelector(".SecondHand"),
    Minute: document.querySelector(".MinuteHand"),
    Hour: document.querySelector(".HourHand")
};

let CurrentTheme = "dark";
let CurrentMode = 1;

let Timer = {
    Running: false,
    Time: 0,
    Interval: undefined
};

function GetFormattedTimeUnit(Unit) {
    return Unit < 10 ? "0" + Unit : Unit;
}

function GetCurrentTime() {
    const Now = new Date();
    return {
        Hours: GetFormattedTimeUnit(Now.getHours()),
        Minutes: GetFormattedTimeUnit(Now.getMinutes()),
        Seconds: GetFormattedTimeUnit(Now.getSeconds()),
        Day: GetFormattedTimeUnit(Now.getDate()),
        Month: GetFormattedTimeUnit(Now.getMonth() + 1),
        Year: Now.getFullYear()
    };
}

function UpdateAnalogHands() {
    const Now = new Date();
    const Seconds = Now.getSeconds();
    const Minutes = Now.getMinutes();
    const Hours = Now.getHours();

    const SecondRotation = Seconds * 6;
    const MinuteRotation = Minutes * 6;
    const HourRotation = Hours * 30;
    AnalogHands.Second.style.rotate = `${SecondRotation}deg`;
    AnalogHands.Minute.style.rotate = `${MinuteRotation}deg`;
    AnalogHands.Hour.style.rotate = `${HourRotation}deg`;
}

function UpdateClockAndDate() {
    Elements.DateElement.innerText = "Timer";
    if (CurrentMode == 2) return;
    Elements.DateElement.style.opacity = "1";
    Elements.ClockElement.style.opacity = "1";

    const Time = GetCurrentTime();
    Elements.ClockElement.textContent = `${Time.Hours}:${Time.Minutes}:${Time.Seconds}`;
    Elements.DateElement.textContent = `${Time.Day}.${Time.Month}.${Time.Year}`;
}

function ApplyTheme(ThemeConfig) {
    document.querySelectorAll("button").forEach(button => {
        button.style.backgroundColor = ThemeConfig.ButtonBgColor;
        button.style.color = ThemeConfig.ButtonTextColor;
    });
    document.body.style.color = ThemeConfig.TextColor;
    document.body.style.backgroundColor = ThemeConfig.BgColor;
    CurrentTheme = ThemeConfig.ThemeName;
    Elements.ThemeElement.textContent = ThemeConfig.ButtonText;
}

function ApplyMode(ModeConfig) {
    Elements.ModeElement.textContent = ModeConfig.ButtonText;
    ClockModes.Analog.style.opacity = ModeConfig.AnalogOpacity;
    ClockModes.Digital.querySelector(".Clock").style.opacity = ModeConfig.DigitalOpacity;
}

const Modes = [
    { ButtonText: "Mode: Analog", AnalogOpacity: "1", DigitalOpacity: "0" },
    { ButtonText: "Mode: Digital", AnalogOpacity: "0", DigitalOpacity: "1" },
    { ButtonText: "Mode: Timer", AnalogOpacity: "0", DigitalOpacity: "1" }
];
ApplyMode(Modes[CurrentMode]);

function ToggleTheme() {
    if (CurrentTheme === "dark") {
        ApplyTheme({
            TextColor: "rgb(40, 40, 40)",
            BgColor: "white",
            ThemeName: "light",
            ButtonText: "Theme: Dark",
            ButtonBgColor: "rgb(40, 40, 40)",
            ButtonTextColor: "white"
        });
    } else {
        ApplyTheme({
            TextColor: "white",
            BgColor: "rgb(40, 40, 40)",
            ThemeName: "dark",
            ButtonText: "Theme: Light",
            ButtonBgColor: "white",
            ButtonTextColor: "rgb(40, 40, 40)"
        });
    }
}

function ToggleMode() {
    CurrentMode = (CurrentMode + 1) % 3;
    CurrentMode == 2 ? Elements.TimerButton.style.opacity = "1" : Elements.TimerButton.style.opacity = "0";
    CurrentMode == 2 ? Elements.TimerSetup.style.opacity = "1" : Elements.TimerSetup.style.opacity = "0";
    ApplyMode(Modes[CurrentMode]);
}

function ToggleTimerStartStop() {
    const Now = new Date();
    const Hours = parseInt(Elements.TimerSetup.querySelector(".Hours").value);
    const Minutes = parseInt(Elements.TimerSetup.querySelector(".Minutes").value);
    const Seconds = parseInt(Elements.TimerSetup.querySelector(".Seconds").value);
    Now.setHours(Hours, Minutes, Seconds, 0);

    Timer.Time = (Hours * 3600) + (Minutes * 60) + Seconds;
    Timer.Running = !Timer.Running;

    if (Timer.Running) {
        if (Timer.Interval === undefined) {
            Timer.Interval = setInterval(UpdateTimer, 1000);
        }
    } else {
        clearInterval(Timer.Interval);
        Timer.Interval = undefined;
    }
}

function UpdateTimer() {
    if (Timer.Time > 0) {
        Timer.Time--;
        const Hours = Math.floor(Timer.Time / 3600);
        const Minutes = Math.floor((Timer.Time % 3600) / 60);
        const Seconds = Timer.Time % 60;
        Elements.ClockElement.textContent = `${GetFormattedTimeUnit(Hours)}:${GetFormattedTimeUnit(Minutes)}:${GetFormattedTimeUnit(Seconds)}`;
    } else {
        clearInterval(Timer.Interval);
        Timer.Interval = undefined;
        Elements.ClockElement.textContent = "00:00:00";
    }
}


function Init() {
    CurrentMode == 2 ? Elements.TimerButton.style.opacity = "1" : Elements.TimerButton.style.opacity = "0";
    CurrentMode == 2 ? Elements.TimerSetup.style.opacity = "1" : Elements.TimerSetup.style.opacity = "0";
    Elements.UpdateLabel.innerText = "AU09122024";

    Elements.ThemeElement.addEventListener("click", ToggleTheme);
    Elements.ModeElement.addEventListener("click", ToggleMode);
    Elements.TimerButton.addEventListener("click", ToggleTimerStartStop);

    UpdateClockAndDate();
    setInterval(UpdateAnalogHands, 1000);
    setInterval(UpdateClockAndDate, 125);
}

Init();