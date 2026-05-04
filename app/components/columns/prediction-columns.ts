import type { TableColumn } from "@nuxt/ui";
import { PredictionResultStatus, PredictionStatus, type Prediction } from "~/types/playground";
import { UBadge } from "#components";

const getPredictionStatusColor = (status: string, result: string) => {
  if (status === PredictionStatus.ACTIVE) return 'secondary';
  if (result === PredictionResultStatus.WIN) return 'primary';
  if (result === PredictionResultStatus.LOSS) return 'error';
  return 'neutral';
};

const getPredictionStatusLabel = (status: string, result: string) => {
  if (status === PredictionStatus.ACTIVE) return 'Ongoing';
  if (result === PredictionResultStatus.WIN) return 'Win';
  if (result === PredictionResultStatus.LOSS) return 'Loss';
  return 'Closed';
};


export const predictionColumns: TableColumn<Prediction>[] = [
    {
        accessorKey: 'title',
        header: 'Event',
        cell: ({ row }) => row.getValue('title'),
        meta:{
            class:{
                th: 'text-muted',
                td: 'text-default font-medium rounded-l-xl',
            }
        }
    },
    {
        header: 'Side',
        cell: ({ row }) => {
            const { oddsTitle, odds } = row.original

            return `${oddsTitle} (${odds})`
        },
        meta:{
            class:{
                th: 'text-muted',
                td: 'text-default font-medium',
            }
        }
    },
    {
        header: 'Potential Return',
        cell: ({ row }) => {
            const { value, resultValue } = row.original

            return h('div', { class: 'flex flex-col' }, [
                h('span', { class: 'font-semibold text-default' }, `$${formatMoney(value)}`),
                h('span', { class: 'font-normal text-success' }, `+$${formatMoney(resultValue)}`)
            ])
        },
        meta:{
            class:{
                th: 'text-muted text-right',
                td: 'text-default font-medium text-right',
            }
        }
    },
    {
        header: 'Status',
        cell: ({ row }) => {
            const { status, resultStatus } = row.original
            const color = getPredictionStatusColor(status, resultStatus)
            const label = getPredictionStatusLabel(status, resultStatus)

            return h(
                UBadge, 
                { variant: 'soft', size: 'md', color: color },
                { default: () => label },
            )
        },
        meta: {
            class: {
                th: 'text-center text-muted',
                td: 'text-center rounded-r-xl'
            }
        }
    }
]