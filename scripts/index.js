const Elements = {
    DateElement: document.querySelector(".Date"),
    ClockElement: document.querySelector(".Clock"),
    ThemeElement: document.querySelector(".Theme"),
    ModeElement: document.querySelector(".Mode"),
    UpdateLabel: document.querySelector(".AnnualUpdateLabel"),
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
let CurrentMode = "digital";

function GetFormattedTimeUnit(unit) {
    return unit < 10 ? "0" + unit : unit;
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
    ClockModes.Digital.style.opacity = ModeConfig.DigitalOpacity;
}

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
    if (CurrentMode === "digital") {
        CurrentMode = "analog";
        ApplyMode({
            ButtonText: "Mode: Digital",
            AnalogOpacity: "1",
            DigitalOpacity: "0"
        });
    } else {
        CurrentMode = "digital";
        ApplyMode({
            ButtonText: "Mode: Analog",
            AnalogOpacity: "0",
            DigitalOpacity: "1"
        });
    }
}

function Init() {
    Elements.UpdateLabel.innerText = "AU09122024";

    Elements.ThemeElement.addEventListener("click", ToggleTheme);
    Elements.ModeElement.addEventListener("click", ToggleMode);

    UpdateClockAndDate();
    setInterval(UpdateAnalogHands, 1000);
    setInterval(UpdateClockAndDate, 125);
}

Init();