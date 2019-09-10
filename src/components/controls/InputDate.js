import React, {
    useEffect,
    useState,
    useMemo,
    useRef
} from "react";
import parse from "date-fns/parse";
import isValid from "date-fns/isValid";
import format from "date-fns/format";
import { hot } from "react-hot-loader";
import { ptBR, enUS, es } from "date-fns/locale";
import Calendar from "./Calendar";
import useInputDropdown from "../../hooks/useInputDropdown";

const parseISO = v => parse(v, "yyyy-MM-dd", new Date());
const DATE_SEP = /\/|-/g;

const SHORT_FORMATS = {
    "pt-BR": ptBR.formatLong.date({ width: "short" }),
    en: enUS.formatLong.date({ width: "short" }),
    es: es.formatLong.date({ width: "short" })
};

const InputDate = props => {
    const {
        value,
        onValue,
        locale = "pt-BR",
        disabled,
        min,
        max
    } = props;
    const [text, setText] = useState();
    const [popper, setPopper] = useState(false);
    // const dateFNSLocale = ptBR
    const datePattern =
        SHORT_FORMATS[locale] || SHORT_FORMATS["pt-BR"];

    const [D, M, Y] = useMemo(() => {
        const split = datePattern
            .split(DATE_SEP)
            .map(x => x[0]);
        return [
            split.indexOf("d"),
            split.indexOf("M"),
            split.indexOf("y")
        ];
    }, [datePattern]);

    const onChange = useMemo(
        () => e => {
            const text = e.target.value;
            setText(text);

            const dateparts = DATE_SEP.test(text)
                ? text
                      .split(DATE_SEP)
                      .map(x => x.replace(/\D/g, ""))
                : [
                      text
                          .replace(/\D/g, "")
                          .substring(0, 2) || null,
                      text
                          .replace(/\D/g, "")
                          .substring(2, 4) || null,
                      text
                          .replace(/\D/g, "")
                          .substring(4) || null
                  ];
            const [d, _m, _y] = [
                dateparts[D],
                dateparts[M],
                dateparts[Y]
            ];
            const [YEAR, MONTH] = format(
                new Date(),
                "yyyy-MM"
            ).split("-");
            const m = _m || MONTH;
            const y =
                _y && YEAR.substring(0, 4 - _y.length) + _y;

            if (d && m) {
                const date = y
                    ? parse(
                          [d, m, y].join("/"),
                          "d/M/y",
                          new Date()
                      )
                    : parse(
                          [d, m].join("/"),
                          "d/M",
                          new Date()
                      );
                if (isValid(date)) {
                    onValue(format(date, "yyyy-MM-dd"));
                }
            }
        },
        [onValue, D, M, Y]
    );

    useEffect(() => {
        if (disabled && disabled !== "false")
            setText(undefined);
    }, [disabled]);

    const onBlur = useMemo(
        () => () => {
            setText(undefined);
        },
        []
    );
    const inputRef = useRef();

    const Popper = useInputDropdown(inputRef);

    const date = (value && parseISO(value)) || null;

    const formatted =
        (date &&
            isValid(date) &&
            format(date, datePattern)) ||
        null;

    return [
        <input
            key="input"
            ref={inputRef}
            className="form-control"
            type="text"
            pattern="[0-9|\/|-]*"
            inputMode="numeric"
            required={props.required}
            value={
                text != null
                    ? text
                    : formatted != null
                    ? formatted
                    : ""
            }
            onChange={onChange}
            onBlur={onBlur}
        />,
        <Popper key="popper" disabled={disabled}>
            <Calendar
                value={value}
                onValue={onValue}
                min={min}
                max={max}
                disabled={disabled}
            />
        </Popper>
    ];
};

export default hot(module)(InputDate);
